import {signOutUser} from "../../Helpers/js-helpers";
import {useNavigate} from "react-router-dom";
import styles from "../Home/Home.module.css";
import {useEffect, useState} from "react";
import {collection, addDoc, onSnapshot, doc, setDoc, deleteDoc} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL, getBlob, deleteObject} from "firebase/storage";
import db, {storage} from "../../firebase"

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
        console.log(docRef);
    }

    const editUser = async (id, newUser = editFormValues) => {
        const docRef = doc(db,"profile", id)
        // await setDoc(docRef, { //Hard coded editUser
        //     ...user,
        //     firstName: "joy",
        // })
        console.log("editFormValues", newUser)
        await setDoc(docRef, newUser);
    }

    const handleSaveEdit = async (id, newUser) => {
        await editUser(id, newUser);
        setEditID('');
        setEditFormValues({});
    }

    const setFormData = (value, key) => {
        setEditFormValues((prevState)=>{
            return{
                ...prevState,
                [key]: value,
            }
        });
    };


    const handleUpload = (e) => {
        console.log(e.target.files[0])
        const storageRef = ref(storage, `/photos/${e.target.files[0].name}`)
        const uploadData = uploadBytesResumable(storageRef, e.target.files[0])

        uploadData.on("state_changed",
            (snapshot)=> {
            const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log(progress, "%");
        },
            (err)=> console.log(err),
            ()=>{
                getDownloadURL(uploadData.snapshot.ref)
                    // .then(url => console.log(url))
                    .then(url => setEditFormValues(prevState => {
                        return{
                            ...prevState,
                            imageUrl: url,
                            imageName: e.target.files[0].name
                        }
                    }))
            }
            )
    }

    const handleDeleteImage = (user) => {
        const imageRef = ref(storage, `photos/${user?.imageName}`);
        deleteObject(imageRef).then((res) => {
            console.log(res)
            handleSaveEdit(user.id, {...user,
                imageUrl: null,
                imageName: null
        })
        }).catch((error) => {
        });
    }

    return(
        <div>
            <div className={styles.mainBox}>
                <div className={styles.main}>
                <h1>Home</h1>
                    <button  style={{ width: 150  }} onClick={()=>signOutUser(navigate)}> SignOut </button>
                    <br/>
                    <button  onClick={handleAddUSer}>Add User</button>
                    {users && users.map((user) => ( // getting collection from firestore
                        editId !== user?.id
                            ? (<div key={user.id}>
                                <p>{user?.firstName}</p>
                                <p>{user?.lastName}</p>
                                <p>{user?.dateOfBirth}</p>
                                <p>{user?.role}</p>

                                {user?.imageUrl && <img src={user.imageUrl} alt=" " style={{width: "100px"}}/> }

                                <button onClick={()=> handleDeleteUser(user?.id)}>Delete</button>
                                <br/>
                                <button onClick={ async ()=>{
                                    const image = await getBlob(ref(storage, `photos/${user?.imageName}`), user?.imageUrl);
                                    const csvURL = window.URL.createObjectURL(image);
                                    const tempLink = document.createElement('a');
                                    tempLink.href = csvURL;
                                    tempLink.setAttribute('download', 'filename.jpeg');
                                    tempLink.click();
                                }}>Download Image</button>
                                <br/>
                                <button onClick={()=>handleDeleteImage(user)}>Delete Image</button>
                                <br/>
                                {/*<button onClick={()=> editUser(user)}>Edit</button> //Hard coded editUser*/}
                                {/*Form coded editUser*/}
                                <button onClick={()=> setEditID(user?.id)}>Edit</button>
                                <br/>
                               </div>)
                            :
                                (<div key={user.id}>
                                    {editFormValues?.imageUrl && <img src={editFormValues.imageUrl} alt=" " style={{width: "100px"}}/> }

                                    <input type="file" onChange={handleUpload} />

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
                                    <button type='button' onClick={()=>handleSaveEdit(user.id)}>Save Edit</button>
                                </div>)
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Home;