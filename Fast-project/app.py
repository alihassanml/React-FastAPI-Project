from fastapi import FastAPI, Depends, HTTPException,Form
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import model 


# Email Send
import smtplib
from starlette.templating import Jinja2Templates
from email.message import EmailMessage

templates = Jinja2Templates(directory='templates')

# cors 

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


# adding Cors url
origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ---------------- All Model  ----------------------

class Supplier(BaseModel):
    name: str = Form(..., title="Name of the supplier")
    company: str = Form(..., title="Company name")
    email: str = Form(..., title="Email address")
    phone: str = Form(..., title="Phone number")

class Product(BaseModel):
    name: str = Form(..., title="Product Name")
    Sold_Out: float = Form(..., title="Sold Out Quantity")
    Total_Quantity: float = Form(..., title="Total Quantity")
    Price: float = Form(..., title="Price")



# ---------------Database --------------------------

model.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#--------------Read Supplier-------------


@app.get('/Read')
async def Read_Data(db: Session = Depends(get_db)):
    data = db.query(model.Supplier).all()
    if not data:
        raise HTTPException(status_code=404, detail='No Supplier is available')
    return data


#--------------Add Supplier-------------

@app.post('/supplier')
async def Create(Name: str = Form(..., title="Name of the supplier"),
                                        company: str = Form(..., title="Company name"),
                                        email: str = Form(..., title="Email address"),
                                        phone: str = Form(..., title="Phone number",max_length=11),
                                        db: Session = Depends(get_db)):
    user_model = model.Supplier()
    user_model.email = email
    user_model.Name = Name
    user_model.Company = company
    user_model.phone = phone
    user_model.is_active = True
    db.add(user_model)
    db.commit()
    return {'Data': 'Successfully Added'}


#--------------Found Supplier-------------

@app.get('/supplier')
async def found_supplier(id: int, db: Session = Depends(get_db)):
    data = db.query(model.Supplier).filter(model.Supplier.id == id).first()
    if not data:
        raise HTTPException(status_code=404, detail='Supplier not found')
    return data

#--------------Update Supplier-------------



@app.put('/supplier/{supplier_id}')
async def update_supplier(supplier_id: int,
                        Name: str = Form(..., title="Name of the supplier"),
                        Company: str = Form(..., title="Company name"),
                        Email: str = Form(..., title="Email address"),
                        Phone: str = Form(..., title="Phone number",max_length=11),
                        db: Session = Depends(get_db)):
    data = db.query(model.Supplier).filter(model.Supplier.id == supplier_id).first()
    if not data:
        raise HTTPException(status_code=404, detail='Supplier not found')
    
    data.email = Email
    data.Name = Name
    data.Company = Company
    data.phone = Phone
    db.add(data)
    db.commit()
    return {"message": "Data Successfully Updated"}


#--------------Delete Supplier-------------


@app.delete('/supplier/{supplier_id}')
async def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    data = db.query(model.Supplier).filter(model.Supplier.id == supplier_id).delete()
    if not data:
        raise HTTPException(status_code=404, detail='Supplier not found')
    db.commit()
    return {"message": "Data Successfully Deleted"}








# ------------------ Product Add -------------------


@app.post('/product_add/')
async def Product_Add(supplier_id: int, 
                    Name: str = Form(..., title="Product Name"),
                    Sold_Out: float = Form(..., title="Sold Out Quantity"),
                    Total_Quantity: float = Form(..., title="Total Quantity"),
                    Price: float = Form(..., title="Price"),
                    db: Session = Depends(get_db)):
    supplier = db.query(model.Supplier).filter(model.Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail='Supplier not found')
    

    product_detail = model.Product()
    product_detail.name = Name
    product_detail.Sold_Out = Sold_Out
    product_detail.Price = Price
    product_detail.Total_Quantity = Total_Quantity
    product_detail.revnue = product_detail.Price * product_detail.Sold_Out
    product_detail.remaning = product_detail.Total_Quantity - product_detail.Sold_Out
    product_detail.Supplier_id = supplier_id

    db.add(product_detail)
    db.commit()
    return {"message": "Product Successfully Added"}



@app.get('/Product/')
async def found_product(db: Session = Depends(get_db)):
    data = db.query(model.Product).all()
    if not data:
        raise HTTPException(status_code=404, detail='Supplier not found')
    return data



@app.put('/Update/Product')
async def Update_Product(id : int,
                        Name: str = Form(..., title="Product Name"),
                        Sold_Out: float = Form(..., title="Sold Out Quantity"),
                        Total_Quantity: float = Form(..., title="Total Quantity"),
                        Price: float = Form(..., title="Price"),
                        db : Session = Depends(get_db)):
    model_data = db.query(model.Product).filter(model.Product.id == id).first()

    if model_data is None:
        raise HTTPException(status_code=404, detail='Product not found')
    
    model_data.name = Name
    model_data.Sold_Out = Sold_Out
    model_data.Price = Price
    model_data.Total_Quantity = Total_Quantity
    model_data.revnue = model_data.Price * model_data.Sold_Out
    model_data.remaning = model_data.Total_Quantity - model_data.Sold_Out
    model_data.Supplier_id == id
    db.add(model_data)
    db.commit()
    return {"message": "Product Successfully Update"}


@app.delete('/product/{product_id}')
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    data = db.query(model.Product).filter(model.Product.id == product_id).delete()
    if not data:
        raise HTTPException(status_code=404, detail='Product not found')
    db.commit()
    return {"message": "Data Successfully Deleted"}





@app.post('/Send/Email')
async def send_email(Supplier_ID: int, 
                    subject:str = Form(...),
                    message:str = Form(...),
                    db: Session = Depends(get_db)):
    try:
        supplier_data = db.query(model.Supplier).filter(model.Supplier.id == Supplier_ID).first()
        if not supplier_data:
            raise HTTPException(status_code=404, detail=f"Supplier with ID {Supplier_ID} not found")
        
        supplier_email = supplier_data.email
        supplier_name = supplier_data.Name

        email_address = "alihassanbscs99@gmail.com"
        email_password = "wywoaswmjgmejtka"  # Consider using environment variables for sensitive data

        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = email_address
        msg['To'] = supplier_email
        message = message


        html_content = f"""
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        /* Reset styles */
        body, h1, h2, h3, p {{
            margin: 0;
            padding: 0;
        }}
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }}
        .header {{
            background-color: #19323a;
            color: #fff;
            text-align: center;
            padding: 20px 0;
        }}
        .content {{
            padding: 20px;
        }}
        .footer {{
            text-align: center;
            padding: 10px;
            background-color: #19323a;
            border-top: 1px solid #ccc;
        }}
        .btn {{
            display: inline-block;
            padding: 10px 20px;
            background-color: #19323a;
            color: #fff;
            margin-top:10px;
            text-decoration: none;
            border-radius: 5px;
        }}
        .btn:hover {{
            background-color: #0056b3;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email from LTD Company</h1>
        </div>
        <div class="content">
            <h2>Hello {supplier_name}</h2>
            <h5>{subject}</h5>
            <p>{message}</p>
            <p>Here's a button example:</p>
            <a href="https://langchain-chatmodel.streamlit.app/" class="btn">Click me</a>
        </div>
        <div class="footer">
            <p>Best regards,<br> By Ali Hassan</p>
        </div>
    </div>
</body>
</html>
        """
         


        msg.add_alternative(html_content, subtype='html')

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(email_address, email_password)
            smtp.send_message(msg)

        return {'Message': 'Email successfully sent'}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")



# ------------------- Add Client ----------------------




@app.get('/Read/Client')
async def Read_Client(db:Session=Depends(get_db)):
    data = db.query(model.Client).all()
    if not data:
        raise HTTPException(status_code=404, detail="No Data Available")
    return data





@app.post('/Client/data/')
async def Add_Client(product_id:int,
                    Name: str = Form(..., title="Client Name"),
                    Email: str = Form(..., title="Client Email"),
                    Phone: str = Form(..., title="Client Phone"),
                    Is_Supplier: bool = Form(..., title="Is Client a Supplier?"),
                    db: Session = Depends(get_db)):
    

    data = db.query(model.Product).filter(model.Product.id == product_id).first()
    if not data:
        raise HTTPException(status_code=404, detail='No Data is available')
    client_model = model.Client(
        name=Name,
        email=Email,
        phone=Phone,
        Is_Supplier=Is_Supplier,
        Product_Id=product_id,
        Product_Name = data.name
    )
    
    db.add(client_model)
    db.commit()
    return {'Data': 'Successfully Added'}




@app.put('/Client/updata/')
async def update_Client(
                    id : int,
                    product_id:int = Form(..., title="Product Id"),
                    Name: str = Form(..., title="Client Name"),
                    Email: str = Form(..., title="Client Email"),
                    Phone: str = Form(..., title="Client Phone"),
                    Is_Supplier: bool = Form(..., title="Is Client a Supplier?"),
                    db: Session = Depends(get_db)):
    
    product = db.query(model.Product).filter(model.Product.id == product_id).first()
    data_user = db.query(model.Client).filter(model.Client.id == id).first()
    if not data_user:
        raise HTTPException(status_code=404, detail='No Data is available')

    data_user.name=Name,
    data_user.email=Email,
    data_user.phone=Phone,
    data_user.Is_Supplier=Is_Supplier,
    data_user.Product_Id=product_id,
    data_user.Product_Name = product.name
    db.add(data_user)
    db.commit()
    return {'Data': 'Successfully Update'}