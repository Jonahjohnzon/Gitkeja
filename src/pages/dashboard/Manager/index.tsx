import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import PropertyStatistics from "./PropertyStatistics";
import PropertyOccupancyChart from "./PropertyOccupancyChart";
import RentCollectionChart from "./RentCollectionChart";
import MaintenanceRequestsChart from "./MaintenanceRequestsChart";
import PropertyLocationMap from "./PropertyLocationMap";
import PropertyPerformance from "./PropertyPerformance";
import LeaseExpiryWidget from "./LeaseExpiryWidget";
import VacancyAlertWidget from "./VacancyAlertWidget";

// data
import { maintenanceRequests, leaseExpirations } from "./data";
import axios from "axios";
import config from "../../../config";
import Spinner from "../../../components/Spinner";

const PropertyManagerDashboard = () => {
const  [properties, setProperties] = useState([])

//Single Api Get
const Get =()=>{
  try{
  axios.get(`${config.API_URL}/api/getManagerProperty`).then((resp)=>{
    const data = resp.data
    setProperties(data.data)
  })
}
catch(error){
  console.log(error)
}
}

useEffect(()=>{
  Get()
},[])

  if(properties.length === 0)
  {
    return  <div className=" w-100 d-flex justify-content-center align-items-center bg-light vh-100">
            <Spinner size='lg' type='grow'   className="text-secondary m-2"/>
            <Spinner type="grow" className="spinner-grow-sm m-2"  size='sm'/>
            </div>
  }
  return (
   <>{<>
      <PageTitle
        breadCrumbItems={[
          { label: "Property Management", path: "/property-management" },
          { label: "Dashboard", path: "/property-management/dashboard", active: true },
        ]}
        title={"Property Manager Dashboard"}
      />
      
      <PropertyStatistics properties={properties} />
      
      <Row>
        <Col md={12} xl={4}>
          <PropertyOccupancyChart properties={properties} />
        </Col>
        <Col md={6} xl={4}>
          <RentCollectionChart properties={properties} />
        </Col>
        <Col md={6} xl={4}>
          <MaintenanceRequestsChart requests={properties} />
        </Col>
      </Row>
      
      <Row>
        <Col xl={6}>
          <PropertyLocationMap properties={properties} />
        </Col>
        <Col xl={6}>
          <PropertyPerformance properties={properties} />
        </Col>
      </Row>
      
       <Row>
        {/*<Col md={6}>
          <LeaseExpiryWidget leaseExpirations={leaseExpirations} />
        </Col> */}
        <Col md={6}>
          <VacancyAlertWidget properties={properties} />
        </Col>
      </Row>
    </>}</> 
  );
};

export default PropertyManagerDashboard;