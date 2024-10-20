// src/pages/BillsUtilities/BillForm.tsx

import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { APICore } from '../helpers/api/apiCore';

interface BillFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (bill: any) => void;
  sending:boolean
}

const BillForm: React.FC<BillFormProps> = ({ show, onHide, onSubmit, sending }) => {
  const api = new APICore()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [properties, setProperties] = useState([])
  const onSubmitForm = (data: any) => {
    onSubmit(data);
  };

  const getProperties = async() =>{
    try{
      const {data}  = await api.get('/api/getPropertyname')
      if(data.result)
      {
        setProperties(data.data)
      }
    }
    catch(error)
    {
      console.log(error)
    }
 }

 useEffect(()=>{
  getProperties()
 },[])
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select {...register('type', { required: 'Type is required' })}>
              <option value="">Select type</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Property Tax">Property Tax</option>
              <option value="Management Fee">Management Fee</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.type?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              {...register('amount', { 
                required: 'Amount is required',
                min: { value: 0, message: 'Amount must be positive' }
              })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              isInvalid={!!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dueDate?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property</Form.Label>
            <Form.Select {...register('property', { required: 'Property is required' })}>
            {
              properties.map((e:any,i)=>{
                return(
                  <option key={e._id} value={e._id}>{e.name}</option>
                )
              })
            }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.property?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" disabled={sending}>{sending?"Adding Bill":"Add Bill"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BillForm;