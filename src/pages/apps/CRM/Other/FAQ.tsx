import React from "react";
import { Row, Col } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import FAQs from "../../../../components/FAQs";

interface RawFaqs {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const rawFaqs: RawFaqs[] = [
    {
      id: 1,
      question: "What is Keja Plus?",
      answer: "Keja Plus is an innovative property management platform designed to streamline the rental process for landlords, property managers, and tenants in Kenya. It offers features such as automated invoicing, financial management, and maintenance tracking.",
    },
    {
      id: 2,
      question: "How does Keja Plus handle rent payments?",
      answer: "Keja Plus integrates with Mpesa Daraja API to facilitate seamless rent payments. Tenants can easily pay their rent through the platform, and landlords receive real-time updates on payments.",
    },
    {
      id: 3,
      question: "Can I manage multiple properties on Keja Plus?",
      answer: "Yes, Keja Plus allows you to manage multiple properties from a single dashboard. You can easily switch between properties and view consolidated reports for your entire portfolio.",
    },
    {
      id: 4,
      question: "How does Keja Plus handle maintenance requests?",
      answer: "Tenants can submit maintenance requests directly through the platform. Property managers receive notifications and can track the status of each request, assign tasks to maintenance staff, and communicate updates to tenants.",
    },
    {
      id: 5,
      question: "Is Keja Plus suitable for both small and large property portfolios?",
      answer: "Absolutely! Keja Plus offers tiered pricing plans to accommodate various portfolio sizes, from individual landlords to large property management companies.",
    },
    // Add more relevant FAQs here
  ];

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Help Center", path: "/help-center" },
          { label: "FAQs", path: "/help-center/faq", active: true },
        ]}
        title={"Frequently Asked Questions"}
      />
      <Row>
        <Col>
          <div className="text-center">
            <i className="h1 mdi mdi-comment-multiple-outline text-muted"></i>
            <h3 className="mb-3">How can we help you?</h3>
            <p className="text-muted">
              Find answers to common questions about Keja Plus and its features.
              <br /> If you can't find what you're looking for, feel free to contact our support team.
            </p>
            <button
              type="button"
              className="btn btn-success waves-effect waves-light mt-2 me-1"
            >
              <i className="mdi mdi-email-outline me-1"></i> Contact Support
            </button>
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light mt-2"
            >
              <i className="mdi mdi-book-open-outline me-1"></i> View Documentation
            </button>
          </div>
        </Col>
      </Row>
      <FAQs rawFaqs={rawFaqs} containerClass={"pt-5"} />
    </React.Fragment>
  );
};

export default FAQ;