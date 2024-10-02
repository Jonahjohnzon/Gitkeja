import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Row, Col, Alert } from 'react-bootstrap';
import { WaterMeterReadingData } from '../../../types';

interface WaterMeterReadingFormProps {
  paymentId: number;
  onSubmit: (readingData: WaterMeterReadingData) => void;
  initialData?: WaterMeterReadingData;
}

const WaterMeterReadingForm: React.FC<WaterMeterReadingFormProps> = ({ paymentId, onSubmit, initialData }) => {
  const [previousReading, setPreviousReading] = useState<number | ''>('');
  const [currentReading, setCurrentReading] = useState<number | ''>('');
  const [previousImage, setPreviousImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [previousImagePreview, setPreviousImagePreview] = useState<string | null>(null);
  const [currentImagePreview, setCurrentImagePreview] = useState<string | null>(null);
  const [readingDate, setReadingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setPreviousReading(initialData.previousReading);
      setCurrentReading(initialData.currentReading);
      setReadingDate(initialData.readingDate);
      // Note: We can't set the File objects directly, but we could set preview URLs if available
    }
  }, [initialData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    if (typeof previousReading !== 'number' || typeof currentReading !== 'number') {
      setError('Please enter valid readings');
      return false;
    }
    if (currentReading < previousReading) {
      setError('Current reading cannot be less than previous reading');
      return false;
    }
    if (!previousImage || !currentImage) {
      setError('Please upload both previous and current meter images');
      return false;
    }
    if (!readingDate) {
      setError('Please enter a valid reading date');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit({
        paymentId,
        previousReading: previousReading as number,
        currentReading: currentReading as number,
        previousImage,
        currentImage,
        readingDate
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Reading Date</Form.Label>
        <Form.Control 
          type="date" 
          value={readingDate} 
          onChange={(e) => setReadingDate(e.target.value)}
          required
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Previous Reading</Form.Label>
            <Form.Control 
              type="number" 
              value={previousReading} 
              onChange={(e) => setPreviousReading(e.target.value ? Number(e.target.value) : '')}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Current Reading</Form.Label>
            <Form.Control 
              type="number" 
              value={currentReading} 
              onChange={(e) => setCurrentReading(e.target.value ? Number(e.target.value) : '')}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Previous Meter Image</Form.Label>
            <Form.Control 
              type="file" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e, setPreviousImage, setPreviousImagePreview)} 
              accept="image/*"
              required
            />
            {previousImagePreview && (
              <Image src={previousImagePreview} alt="Previous meter reading" thumbnail className="mt-2" style={{ maxWidth: '200px' }} />
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Current Meter Image</Form.Label>
            <Form.Control 
              type="file" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e, setCurrentImage, setCurrentImagePreview)} 
              accept="image/*"
              required
            />
            {currentImagePreview && (
              <Image src={currentImagePreview} alt="Current meter reading" thumbnail className="mt-2" style={{ maxWidth: '200px' }} />
            )}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit Reading
      </Button>
    </Form>
  );
};

export default WaterMeterReadingForm;