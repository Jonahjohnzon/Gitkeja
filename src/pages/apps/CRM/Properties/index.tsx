import React, { useEffect } from "react";
import { Row, Col, Card, Button, ButtonGroup, Dropdown, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "../../../../redux/auth/constants";
import { AppDispatch } from "../../../../redux/store";
import DefaultImage from "../../../../components/DefaultImage";

// components
import PageTitle from "../../../../components/PageTitle";

import { PropertyType } from "./data";

// single property
const SingleProperty = (props: { property: PropertyType }) => {


const property = props.property || {};

  return (
    <Card className="property-box">
      <Card.Body>
        <Dropdown className="card-widgets" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop p-0 shadow-none">
            <i className="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><i className="mdi mdi-pencil me-1"></i>Edit</Dropdown.Item>
            <Dropdown.Item><i className="mdi mdi-delete me-1"></i>Delete</Dropdown.Item>
            <Dropdown.Item><i className="mdi mdi-email-outline me-1"></i>Send Message</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="mt-0">
          <Link to={`/apps/projects/${property._id}/details`} className="text-dark">
            {property.name}
          </Link>
        </h4>
        <p className="text-muted text-uppercase"><i className="mdi mdi-map-marker"></i> <small>{property.location}</small></p>

        <div className={classNames("badge", {
          "bg-soft-success text-success": property.status === "Occupied",
          "bg-soft-warning text-warning": property.status === "Partially Occupied",
          "bg-soft-danger text-danger": property.status === "Vacant",
        }, "mb-3")}>
          {property.status}
        </div>

        <p className="text-muted font-13 mb-3 sp-line-2">{property.description}</p>
        <p className="mb-1">
          <span className="pe-2 text-nowrap mb-2 d-inline-block">
            <i className="mdi mdi-home-variant text-muted me-1"></i>
            <b>{property.units}</b> Units
          </span>
          <span className="text-nowrap mb-2 d-inline-block">
            <i className="mdi mdi-cash text-muted me-1"></i>
            <b>${property.rentAmount}</b> /month
          </span>
        </p>
        <div className="avatar-group mb-3">
          {(property.managers || []).map((manager, index) => {
            return (
              <OverlayTrigger
                key={index}
                placement="bottom"
                overlay={<Tooltip id={manager.name}>{manager.name}</Tooltip>}
              >
                <Link to="#" className="avatar-group-item">
                {manager.image?<img src={manager.image} className="rounded-circle  avatar-sm" alt="" />:<DefaultImage username={manager?.name}/>}
                </Link>
              </OverlayTrigger>
            );
          })}
        </div>
        <p className="mb-2 fw-semibold">
          Occupancy Rate:
          <span className="float-end">{property.occupancy}%</span>
        </p>
        <ProgressBar now={property.occupancy} className="mb-1" style={{ height: "7px" }} />
      </Card.Body>
    </Card>
  );
};

const Properties = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {propertiesList} = useSelector((state:RootState)=>state.Auth)
  const PropertiesList: PropertyType[] = propertiesList

  useEffect(()=>{
    dispatch({type:AuthActionTypes.GETPROPERTY,payload:{limit:9}})
  },[dispatch])
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Properties", path: "/apps/properties" },
          { label: "Properties List", path: "/apps/properties", active: true },
        ]}
        title={"Properties List"}
      />

      <Row className="mb-2">
        <Col sm={4}>
          <Link to="/apps/projects/create" className="btn btn-danger rounded-pill waves-effect waves-light mb-3">
            <i className="mdi mdi-plus"></i> Add Property
          </Link>
        </Col>
        <Col sm={8}>
          <div className="text-sm-end">
            <ButtonGroup className="mb-3">
              <Button variant="primary">All</Button>
              <Button variant="light">Occupied</Button>
              <Button variant="light">Vacant</Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>

      <Row>
        {(PropertiesList || []).map((property, i) => {
          return (
            <Col lg={4} key={`prop-${property._id}`} >
              <SingleProperty property={property} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Properties;