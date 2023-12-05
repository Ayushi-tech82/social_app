'use client'

import React, { useRef, useState } from 'react';
import { GrGallery } from 'react-icons/gr';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const Card: React.FC = () => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click event
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Perform any additional logic for handling the uploaded image
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    const { native } = emoji;
    setInput(input + native);
    setShowEmojis(false);
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setInput(date ? input + date.toLocaleDateString() : input);
    setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleButtonClick = () => {
    // Handle button click logic here
  };

  return (
    <div>
      <div className="post-card">
        <textarea
          rows={2}
          className="textarea"
          placeholder="What's Happening?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="file-input" className="file-input-label">
          {selectedImage ? (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="selected-image" />
          ) : (
            null
          )}
        </label>
        <GrGallery className="gallery-icon" onClick={handleImageUpload} />
        <input
          id="file-input"
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <MdOutlineEmojiEmotions className="emoji-icon" onClick={() => setShowEmojis(!showEmojis)} />
        <IoCalendarNumberOutline className="calendar-icon" onClick={handleCalendarToggle} />
        <HiOutlineLocationMarker className="location-icon" />
        
        <button
          className='tweet-button'
            disabled={!input.trim() && !selectedImage}
            onClick={handleButtonClick}
          >
            Post
          </button>
      </div>
      {showEmojis && (
        <div>
          <Picker onEmojiSelect={handleEmojiSelect} data={data} theme="light" />
        </div>
      )}
      {showCalendar && (
        <div className="calendar-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            inline
          />
         
        </div>
      )}
    </div>
  );
};

export default Card;