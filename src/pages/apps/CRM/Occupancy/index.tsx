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
// Mock data - replace with API calls in production


const mockPropertyOccupancies: PropertyOccupancy[] = [
  {
    _id: 1,
    name: 'Sunset Apartments',
    totalUnits: 50,
    occupiedUnits: 45,
    occupancyRate: 0.9,
    averageRent: 1500
  },
  {
    _id: 2,
    name: 'Lakeside Villas',
    totalUnits: 30,
    occupiedUnits: 28,
    occupancyRate: 0.93,
    averageRent: 1800
  },
  // Add more mock data as needed
];

const OccupancyPage: React.FC = () => {
  const {  OccupancyReport,  OccupancyLoad, OccupancyReports } = useSelector((state: RootState) => state.Auth);
  const occupancyReports = OccupancyReports
  const [propertyOccupancies, setPropertyOccupancies] = useState<PropertyOccupancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    // Simulate API call
    dispatch({ type: AuthActionTypes.GETOCCUPANCY });
    dispatch({type: AuthActionTypes.GETOCCREPORT})

    const fetchData = async () => {
      try {
        // In a real application, these would be API calls
        setPropertyOccupancies(mockPropertyOccupancies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (OccupancyLoad) {
    return <div></div>;
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
            propertyOccupancies={propertyOccupancies}
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
          <PropertyOccupancyDetails propertyOccupancies={propertyOccupancies} />
        </Col>
      </Row>
    </>
  );
};

export default OccupancyPage;