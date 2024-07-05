from sqlalchemy import Boolean,Integer,Column,String,ForeignKey,Float
from sqlalchemy.orm import relationship
from database import Base

class Supplier(Base):
    __tablename__ = 'Supplier'
    id = Column(Integer,primary_key=True,index=True)
    Name = Column(String,unique=True,index=True)
    email = Column(String,unique=True,index=True)
    Company = Column(String)
    phone = Column(String)
    is_active = Column(Boolean, default=True)

    todos = relationship('Product',back_populates='owner')

class Product(Base):
    __tablename__ = 'Product'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True)
    Sold_Out = Column(Float,default=0.0)
    Total_Quantity = Column(Float,default=0.0)
    Price = Column(Float,default=0.0)
    revnue = Column(Float,default=0.0)
    remaning = Column(Integer,default=0)
    Supplier_id = Column(Integer,ForeignKey('Supplier.id'))
    owner = relationship('Supplier',back_populates='todos')



class Client(Base):
    __tablename__ = 'Client'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True)
    email = Column(String)
    phone = Column(String)
    Is_Supplier = Column(String)
    Product_Name = Column(String)
    Product_Id = Column(Integer)


