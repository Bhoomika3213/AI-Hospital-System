import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [patients, setPatients] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [occupiedBeds, setOccupiedBeds] = useState(10);
  const [newPatients, setNewPatients] = useState(5);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/patients"
      );
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPatient = async () => {
    if (!name || !age || !disease) {
      alert("Please enter name, age and disease");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/patients",
        {
          name,
          age: Number(age),
          disease,
          gender,
          phone
        }
      );

      setName("");
      setAge("");
      setDisease("");
      setGender("");
      setPhone("");

      loadPatients();
    } catch (error) {
      console.error(error);
      alert("Could not add patient");
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/patients/${id}`
      );

      loadPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const predictedBeds =
    Number(occupiedBeds) + Number(newPatients);

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial"
    }}>

      <h1>🏥 AI Hospital Resource & Maintenance Intelligence System</h1>

      <hr />

      <h2>Patient Management</h2>

      <input
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        placeholder="Disease"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />

      <input
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addPatient}>
        Add Patient
      </button>

      <h3>Patients</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.disease}</td>
              <td>{patient.gender}</td>
              <td>{patient.phone}</td>
              <td>
                <button
                  onClick={() =>
                    deletePatient(patient.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>🤖 AI Bed Prediction</h2>

      <p>Current Occupied Beds:</p>

      <input
        type="number"
        value={occupiedBeds}
        onChange={(e) =>
          setOccupiedBeds(e.target.value)
        }
      />

      <p>Expected New Patients:</p>

      <input
        type="number"
        value={newPatients}
        onChange={(e) =>
          setNewPatients(e.target.value)
        }
      />

      <h2>
        Predicted Beds Required: {predictedBeds}
      </h2>

      {predictedBeds > 15 && (
        <p style={{ color: "red" }}>
          ⚠ More beds may be required.
        </p>
      )}

    </div>
  );
}

export default App;