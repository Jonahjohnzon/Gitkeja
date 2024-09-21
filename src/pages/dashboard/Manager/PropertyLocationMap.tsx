import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { WorldVectorMap } from "../../../components/VectorMap";
import { Property } from "./data";

interface PropertyLocationMapProps {
  properties: Property[];
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({ properties }) => {
  // Ensure markers are always defined, even if empty
  const markers = properties.map((property, index) => ({
    name: property.name,
    coords: [
      -100 + Math.random() * 200, // Random longitude between -100 and 100
      -50 + Math.random() * 100   // Random latitude between -50 and 50
    ]
  }));

  const options = {
    markers: markers,
    markerStyle: {
      initial: {
        r: 9,
        fill: "#6658dd",
        "fill-opacity": 0.9,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4,
      },
      hover: {
        fill: "#6658dd",
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5,
      },
    },
    backgroundColor: "transparent",
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: "#e3eaef",
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>View All Properties</Dropdown.Item>
            <Dropdown.Item>Add New Property</Dropdown.Item>
            <Dropdown.Item>Generate Report</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Property Locations</h4>
        <div style={{ height: "433px" }}>
          {markers.length > 0 ? (
            <WorldVectorMap height="100%" width="100%" options={options} />
          ) : (
            <div className="text-center">No property data available</div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyLocationMap;