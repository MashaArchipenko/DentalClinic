import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Button, Table } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

export const AddWorkShedule = () => {
    const { loading, request } = useHttp();
    const [staff, setStaff] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [saveId,setSaveId]=useState('');
    const { token} = useContext(AuthContext)
    const dateRef = useRef()
    const idRef = useRef()
    const [workSheduleInfo, setWorkSheduleInfo] = useState(
        {
            date: '',
            startTime: '',
            endTime: '',
            staffId: ''
        }
    )

    const getDoctor = useCallback(async () => {
        try {
            const data = await request('/api/staff', 'GET', null, { staffN: "Doctor" })
            setDoctors(data)
        } catch (error) {
        }
    }, [request])

    useEffect(() => {
        getDoctor();
    }, [getDoctor])

    const getStaff = useCallback(async () => {
        try {
            const data = await request('/api/shedule/forWorkDay', 'GET', null)
            setStaff(data)
        } catch (error) {
        }
    }, [request])

    useEffect(() => {
        getStaff();
    }, [getStaff])

    if (loading) {
        return <Loader />
    }

    const changeHandler = event => {
        setWorkSheduleInfo({ ...workSheduleInfo, [event.target.name]: event.target.value, [idRef.current.name]: idRef.current.value , [dateRef.current.name]: dateRef.current.value })
    }
    const handleSave = async event => {
        event.preventDefault()
        try {
            const data = await request('/api/shedule/workShedule', 'POST', { ...workSheduleInfo },
                {
                    Authorization: `Bearer ${token}`
                })
            setSaveId(data.name.idStaff);
        } catch (error) {

        }
    }

    const ShowDoctor = () => {
        let listItems = [];
        /*if (staff.length) {console.log("if")
            listItems = staff.map(item => {
                if (!item.idCard) {
                    return (
                        <tr>
                            <td><input type="hidden" name="staffId" ref={idRef} value={item.idStaff}  />
                            <input name="staffName" value={item.staff.name}disabled /></td>
                            <td><input name="date" ref={dateRef} value={item.date} placeholder={item.date.toDateString()} disabled /></td>
                            <td><input type="time" name="startTime" onChange={changeHandler} /></td>
                            <td><input type="time" name="endTime" onChange={changeHandler} /></td>
                            <td><Button onClick={handleSave}>Сохранить</Button></td>
                        </tr>
                    )
                }
            })
        }
        else {*/
            doctors.forEach(element => {
                let date = new Date();
                let finishDate = new Date();
                finishDate.setDate(finishDate.getDate() + 7)
                while (date.toDateString() < finishDate.toDateString()) {
                    if(saveId === element._id)
                    {
                        listItems.push(
                        <tr style={{background:'green'}}>
                            <td><input type="hidden" name="staffId" ref={idRef} value={element._id}  />
                            <input name="staffName" value={element.name}disabled /></td>
                            <td><input name="date" ref={dateRef} value={date} placeholder={date.toDateString()} disabled /></td>
                            <td><input type="time" name="startTime" value={workSheduleInfo.startTime} disabled/></td>
                            <td><input type="time" name="endTime" value={workSheduleInfo.endTime} disabled/></td>
                        </tr>)
                    }
                    else
                    {
                        listItems.push(
                            <tr >
                                <td><input type="hidden" name="staffId" ref={idRef} value={element._id}  />
                                <input name="staffName" value={element.name}disabled /></td>
                                <td><input name="date" ref={dateRef} value={date} placeholder={date.toDateString()} disabled /></td>
                                <td><input type="time" name="startTime" onChange={changeHandler} /></td>
                                <td><input type="time" name="endTime" onChange={changeHandler} /></td>
                                <td><Button onClick={handleSave}>Сохранить</Button></td>
                            </tr>)
                    }
                        date.setDate(date.getDate() + 1);
                }
            });
        
        return (<Table>
            <thead>
                <tr>
                    <th>Имя Врача</th>
                    <th>Дата приема</th>
                    <th>Время начала работы</th>
                    <th>Время окончания работы</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{listItems}</tbody>
        </Table>)
    }

    return (
        <div>
            {!loading && !saveId && ShowDoctor()}
            {!loading && saveId && ShowDoctor()}
        </div>
    )
}