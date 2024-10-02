import React from "react";
import {
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Button,
  Popover,
} from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";

const PopoverDirection: React.FC = () => {
  const directions = ["top", "bottom", "right", "left"];

  const popover = (
    <Popover id="popover-direction">
      <Popover.Body>
        And here's some amazing content. It's very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">Popovers</h4>
        <p className="sub-header">
          Add small overlays of content, like those on the iPad, to any element
          for housing secondary information.
        </p>

        {directions.map((direction) => (
          <OverlayTrigger
            trigger="click"
            key={direction}
            overlay={
              <Popover id={`popover-positioned-${direction}`}>
                <Popover.Body>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="light" className="me-1">
              Popover on {direction}
            </Button>
          </OverlayTrigger>
        ))}

        <OverlayTrigger trigger="focus" overlay={popover}>
          <Button>Dismissible popover</Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

const TooltipDirection: React.FC = () => {
  const directions = ["top", "bottom", "right", "left"];

  return (
    <>
      <h4 className="header-title">Four Directions</h4>
      <p className="text-muted font-14">
        Four options are available: top, right, bottom, and left aligned.
      </p>

      {directions.map((direction) => (
        <OverlayTrigger
          key={direction}
          overlay={
            <Tooltip id={`tooltip-${direction}`}>
              Tooltip on <strong>{direction}</strong>.
            </Tooltip>
          }
        >
          <Button variant="light" className="me-1">
            Tooltip on {direction}
          </Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

const TooltipsPopovers: React.FC = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/tooltips-popovers" },
          {
            label: "Tooltips & Popovers",
            path: "/ui/tooltips-popovers",
            active: true,
          },
        ]}
        title={"Tooltips & Popovers"}
      />

      <Row>
        <Col>
          <PopoverDirection />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <TooltipDirection />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TooltipsPopovers;