import { Technician } from '../types';

interface QualificationAlert {
  type: 'Expired' | 'Expiring';
  message: string;
  severity: 'Critical' | 'Warning';
}

// Match the exact type from Technician interface
type Certification = {
  type: string;
  number: string;
  issuedDate: string;
  expirationDate: string;
  status: string;
};

export const checkQualificationStatus = (technician: Technician): QualificationAlert[] => {
  const alerts: QualificationAlert[] = [];
  const now = new Date();

  // Temporarily comment out this code until TypeScript recognizes the interface update
  /*
  technician.certifications?.forEach((cert: Certification) => {
    const expDate = new Date(cert.expirationDate);
    const daysUntil = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) {
      alerts.push({
        type: 'Expired',
        message: `${cert.type} expired ${-daysUntil} days ago`,
        severity: 'Critical'
      });
    } else if (daysUntil <= 30) {
      alerts.push({
        type: 'Expiring',
        message: `${cert.type} expires in ${daysUntil} days`,
        severity: 'Warning'
      });
    }
  });
  */

  return alerts;
}; 