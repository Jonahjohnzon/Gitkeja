// src/pages/Maintenance/MaintenanceForm.tsx

import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { APICore } from '../helpers/api/apiCore';

interface MaintenanceFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (task: any) => void;
  sending:boolean
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ show, onHide, onSubmit, sending }) => {
  const api =  new APICore()
  const [description, setDescription] = useState('');
  const [property, setProperty] = useState('');
  const [status, setStatus] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [properties, setProperties] = useState([])
  const [properyLoad, setpropertyLoad] = useState(true)
  const [units, setUnits] = useState([])
  const [unitwords, setUnitwords] =  useState('Select Property First')
  const [unit, setUnit] = useState('')
  const [unitLoad, setunitLoad] = useState(true)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      property,
      status,
      cost: parseFloat(cost),
      date,
      unit
    });
  };

 const getProperties = async() =>{
    try{
      const {data}  = await api.get('/api/getPropertyname')
      if(data.result)
      {
        setProperties(data.data)
        setpropertyLoad(false)
      }
    }
    catch(error)
    {
      console.log(error)
    }
 }

 const getUnit = async() =>{
  try{
    if(property == '')
    {
      return
    }
    setUnitwords('Loading..')
    setunitLoad(true)

    const {data}  = await api.get('/api/getUnit',{property:property})
    if(data.result)
    {
    setUnits(data.data)
    setunitLoad(false)
    }
 
  }
  catch(error)
  {
    console.log(error)
  }
 }

 useEffect(()=>{
  getUnit()
 },[property])


 useEffect(()=>{
  getProperties()
 },[])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Maintenance Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property</Form.Label>
            <Form.Select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              required
            >{properyLoad?<>
              <option value={''} disabled selected>Loading...</option>
              </>:<>
              <option value={''} disabled selected>Select Property</option>
              {properties.map((e:any,i)=>{
                return(
                  <option key={e._id} value={e._id}>{e.name}</option>
            
                )
              })}</>}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            >{unitLoad?<>
              <option value={''} disabled selected>{unitwords}</option>
            </>:<>
            <option value={''} disabled selected>Select Unit</option>
              {units.map((e:any,i)=>{
                return(
                  <option key={e._id} value={e.unit}>{e.unit}</option>
            
                )
              })}</>}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value={''} disabled selected>Select Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={sending}>{sending?"Adding Task":"Add Task"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MaintenanceForm;