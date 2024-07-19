import React, { useEffect, useState } from "react";
import diaryServie from "./services/diaries";
import { NonSensitiveDiaryEntry, Visibility, Weather, NewDiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ""
  });

  useEffect(() => {
    const fetchPatientList = async () => {
      const diaries = await diaryServie.getAll();
      setDiaries(diaries);
    };
    void fetchPatientList();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary((prevDiary) => ({
      ...prevDiary,
      [name]: value,
    }));
  };

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedDiary: NonSensitiveDiaryEntry = await diaryServie.create(newDiary);
      setDiaries([...diaries, addedDiary]);
      setNewDiary({
        date: "",
        weather: Weather.Sunny,
        visibility: Visibility.Great,
        comment: ""
      });
      setError(undefined);
    } catch (error) {
        setError(`Error creating diary entry: ${(error as Error).response.data}`);
      }
  };

  return (
    <>
      <h2>add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={createDiary}>
        <div>
          <label>date</label>
          <input 
            type="date" 
            name="date"
            value={newDiary.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>weather</label>
          <input 
            type="radio" 
            id="sunny" 
            name="weather" 
            value={Weather.Sunny}
            checked={newDiary.weather === Weather.Sunny}
            onChange={handleInputChange}
          />
          <label htmlFor="sunny">sunny</label>
          <input 
            type="radio" 
            id="rainy" 
            name="weather" 
            value={Weather.Rainy}
            checked={newDiary.weather === Weather.Rainy}
            onChange={handleInputChange}
          />
          <label htmlFor="rainy">rainy</label>
          <input 
            type="radio" 
            id="cloudy" 
            name="weather" 
            value={Weather.Cloudy}
            checked={newDiary.weather === Weather.Cloudy}
            onChange={handleInputChange}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input 
            type="radio" 
            id="stormy" 
            name="weather" 
            value={Weather.Stormy}
            checked={newDiary.weather === Weather.Stormy}
            onChange={handleInputChange}
          />
          <label htmlFor="stormy">stormy</label>
        </div>
        <div>
          <label>visibility</label>
          <input 
            type="radio" 
            id="great" 
            name="visibility" 
            value={Visibility.Great}
            checked={newDiary.visibility === Visibility.Great}
            onChange={handleInputChange}
          />
          <label htmlFor="great">great</label>
          <input 
            type="radio" 
            id="good" 
            name="visibility" 
            value={Visibility.Good}
            checked={newDiary.visibility === Visibility.Good}
            onChange={handleInputChange}
          />
          <label htmlFor="good">good</label>
          <input 
            type="radio" 
            id="ok" 
            name="visibility" 
            value={Visibility.Ok}
            checked={newDiary.visibility === Visibility.Ok}
            onChange={handleInputChange}
          />
          <label htmlFor="ok">ok</label>
          <input 
            type="radio" 
            id="poor" 
            name="visibility" 
            value={Visibility.Poor}
            checked={newDiary.visibility === Visibility.Poor}
            onChange={handleInputChange}
          />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          <label>comment</label>
          <input 
            type="text" 
            name="comment"
            value={newDiary.comment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
        </div>
      ))}
    </>
  );
}

export default App;
