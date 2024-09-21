import React from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg'
  }[size];

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`rounded-circle ${sizeClass} ${className}`}
    />
  );
};

export default UserAvatar;