import {signOutUser} from "../../Helpers/js-helpers";
import {useNavigate} from "react-router-dom";
import styles from "../Home/Home.module.css";
import {useEffect, useState} from "react";
import {collection, addDoc, onSnapshot, doc, setDoc, deleteDoc} from "firebase/firestore";
import db from "../../firebase"

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editId, setEditID] = useState('');
    const [editFormValues, setEditFormValues] = useState({});
    const [FormValues, setFormValues] = useState({});

    useEffect( ()=> {
        getMyProfileData()
    }, [])

    useEffect(()=> {
        editId !== '' && setEditFormValues(users.filter(user=> user.id ===editId)[0])
    }, [editId])

    const getMyProfileData = () =>{
    console.log('Getting data');
    const collectionRef = collection(db, "profile");
    onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setUsers(data)
    })
    }

    const handleDeleteUser = async(userId) => {
        const docRef = doc(db, "profile", userId)
        await deleteDoc(docRef)
    }

    const handleAddUSer = async() => {
        const collectionRef = collection(db, "profile");
        const docRef = await addDoc(collectionRef, {firstName: "Ihor", lastName: "Doctor", dateOfBirth: "12/04/1980", role: "Mentor"})
        docRef.id && console.log(docRef.id)
        console.log(docRef)
    }

    const editUser = async (user) => {
        const docRef = doc (db,"profile", user.id)
        // await setDoc(docRef, { //Hard coded editUser
        //     ...user,
        //     firstName: "joy",
        // })
        await setDoc(docRef, editFormValues)

    }

    const setFormData = (value, key) => {
        setEditFormValues((prevState)=>{
            return{
                ...prevState,
                [key]: value,
            }
        });
    };

    const handleSaveEdit = async(user) => {
        await editUser(user);
        setEditID('')
    }


    return(
        <div>
            <div className={styles.mainBox}>
                <div className={styles.main}>
                <h1>Home</h1>
                    <button type='button' style={{ width: 150  }} onClick={()=>signOutUser(navigate)}> SignOut </button>
                    <br/>
                    <button type='button' onClick={handleAddUSer}>Add User</button>
                    {users && users.map((user) => ( // getting collection from firestore
                        editId !== user?.id
                            ? (<div key={user.id}>
                                <p>{user?.firstName}</p>
                                <p>{user?.lastName}</p>
                                <p>{user?.dateOfBirth}</p>
                                <p>{user?.role}</p>
                                <button onClick={()=> handleDeleteUser(user?.id)}>Delete</button>
                                <br/>
                                {/*<button onClick={()=> editUser(user)}>Edit</button> //Hard coded editUser*/}
                                {/*Form coded editUser*/}
                                <button onClick={()=> setEditID(user?.id)}>Edit</button>
                                <br/>
                               </div>)
                            :
                                (<div key={user.id}>
                                    <input value={editFormValues?.firstName}
                                           onChange={(e)=> setFormData(e.target.value, 'firstName')}
                                    />
                                    <br/>
                                    <input value={editFormValues?.lastName}
                                           onChange={(e)=> setFormData(e.target.value, 'lastName')}
                                    />
                                    <br/>
                                    <input value={editFormValues?.dateOfBirth}
                                           onChange={(e)=> setFormData(e.target.value, 'dateOfBirth')}
                                    />
                                    <br/>
                                    <input value={editFormValues?.role}
                                           onChange={(e)=> setFormData(e.target.value, 'role')}
                                    />
                                    <button type='button' onClick={()=>handleSaveEdit(user)}>Save Edit</button>
                                </div>)
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Home;