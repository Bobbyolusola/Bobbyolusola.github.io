import {signOutUser} from "../../Helpers/js-helpers";
import {useNavigate} from "react-router-dom";
import styles from "../Register/Register.module.css";
import {useEffect, useState} from "react";
import {collection, addDoc, onSnapshot, doc, setDoc, deleteDoc} from "firebase/firestore";
import db from "../../firebase"

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editId, setEditID] = useState('');
    const [editFormValues, setEditFormValues] = useState({});

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


    return(
        <div>
            <div className={styles.mainBox}>
                <div className={styles.main}>
                <h1>Home</h1>
                    <button onClick={handleAddUSer}>Add User</button>
                    {users && users.map((user) => ( // getting collection from firestore
                        editId !== user?.id
                            ? (<div key={user.id}>
                                <p>{user?.firstName}</p>
                                <p>{user?.lastName}</p>
                                <p>{user?.dateOfBirth}</p>
                                <p>{user?.role}</p>
                                <button onClick={()=> handleDeleteUser(user?.id)}>Delete</button>
                                <br/><br/>
                                {/*<button onClick={()=> editUser(user)}>Edit</button> //Hard coded editUser*/}
                                {/*Form coded editUser*/}
                                <button onClick={()=> setEditID(user?.id)}>Edit</button>
                               </div>)
                            :
                                (<div key={user.id}>
                                    <input value={editFormValues?.firstName}/>
                                    <input value={editFormValues?.role} />
                                 </div>)
                    ))}

            <button type='button' style={{ width: 150  }} onClick={()=>signOutUser(navigate)}> SignOut </button>
                </div>
            </div>
        </div>
    )
}

export default Home;