import React, { useRef, useState, useEffect } from 'react';
import { GrGallery } from 'react-icons/gr';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { db, auth } from '../config/firebase';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';

interface UserDetails {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address: string;
  mobileNo: number;
}

const Card: React.FC = () => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    // Fetch the user details from the database
    const fetchUserDetails = async () => {
      try {
        const userId = auth.currentUser?.uid;
        console.log("y",userId)
        if (userId) {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await userDocRef.get();
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserDetails;
            setUserDetails(userData);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
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
console.log("gh",userDetails)
  const handleButtonClick = async () => {
    try {
      if (userDetails) {
        const post = {
          id: auth.currentUser?.uid,
          username: userDetails.name,
          userImg: '', 
          tag: '', 
          text: input,
          timestamp: serverTimestamp(),
        };

        const postsCollectionRef = collection(db, 'posts');
        const docRef = await addDoc(postsCollectionRef, post);
 console.log(post)
        // Perform any additional logic for uploading the image and updating the post in Firebase

        setInput('');
      }
    } catch (err) {
      console.error(err);
    }
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
          ) : null}
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

        <button className="tweet-button" disabled={!input.trim() && !selectedImage} onClick={handleButtonClick}>
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
          <DatePicker selected={selectedDate} onChange={handleDateSelect} inline />
        </div>
      )}
    </div>
  );
};

export default Card;