import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch  } from 'react-redux';
// components
import PageTitle from '../../../../components/PageTitle';
import OccupancyReportsOverview from './OccupancyReportsOverview';
import OccupancyReportsList from './OccupancyReportsList';
import { AppDispatch } from "../../../../redux/store";

import PropertyOccupancyDetails from './PropertyOccupancyDetails';

// types
import { OccupancyReportsType, PropertyOccupancy } from './types';
import { RootState } from '../../../../redux/store';
import { AuthActionTypes } from '../../../../redux/auth/constants';
import Spinner from '../../../../components/Spinner';
import { getOccupancyApi } from '../../../../redux/actions';
import { APICore } from '../../../../helpers/api/apiCore';
// Mock data - replace with API calls in production


const mockPropertyOccupancies: PropertyOccupancy[] = [

  // Add more mock data as needed
];

const OccupancyPage: React.FC = () => {
  const api =new APICore()
  const {  OccupancyReport,  OccupancyLoad, OccupancyReports} = useSelector((state: RootState) => state.Auth);
  const occupancyReports = OccupancyReports
  const dispatch = useDispatch<AppDispatch>();
  const [propertiesList, setpropertiesList] = useState([])


  useEffect(() => {
    getOccupancyApi(AuthActionTypes.GETOCCUPANCY, {
      OccupancyLoad:true
    })    
    dispatch({ type: AuthActionTypes.GETOCCUPANCY });
    dispatch({type: AuthActionTypes.GETOCCREPORT})
    dispatch({ type: AuthActionTypes.GETPROPERTY, payload: { limit: 1000 } });

  }, []);


  const Get = async()=>{
    try{
      const {data} = await api.get('/api/getPropertyname',{limit:1000})
      if(data.result)
      {
        setpropertiesList(data.data)
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
  useEffect(() => {
    Get()
  }, []);

  if (OccupancyLoad) {
    return  <div className=" w-100 d-flex justify-content-center align-items-center bg-light vh-100">
            <Spinner size='lg' type='grow'   className="text-secondary m-2"/>
            <Spinner type="grow" className="spinner-grow-sm m-2"  size='sm'/>
            </div>
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Apps', path: '/apps' },
          { label: 'Occupancy', path: '/apps/occupancy', active: true },
        ]}
        title={'Occupancy Reports'}
      />

      <Row>
        <Col>
          <OccupancyReportsOverview
            occupancyReports={occupancyReports}
            OccupancyReportType={OccupancyReport}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={8}>
          <OccupancyReportsList
            occupancyReports={occupancyReports}
          />
        </Col>
        <Col xl={4}>
          {propertiesList.length > 0 && <PropertyOccupancyDetails  propertiesList={propertiesList}/>}
        </Col>
      </Row>
    </>
  );
};

export default OccupancyPage;