import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

interface DateRangeFilterProps {
  onFilterChange: (startDate: Date, endDate: Date) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(startDate, endDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-end">
      <Form.Group className="me-2">
        <Form.Label>Start Date</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </Form.Group>
      <Form.Group className="me-2">
        <Form.Label>End Date</Form.Label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </Form.Group>
      <Button type="submit">Apply Filter</Button>
    </Form>
  );
};

export default DateRangeFilter;