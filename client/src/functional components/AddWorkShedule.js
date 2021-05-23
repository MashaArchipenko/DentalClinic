import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Button, Table } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

export const AddWorkShedule = () => {
    const { loading, request } = useHttp();
    const [doctors, setDoctors] = useState([]);
    const { token } = useContext(AuthContext)
    const [times, setTimes] = useState([{ startTime: '', endTime: '' }])
    const [workSheduleInfo, setWorkSheduleInfo] = useState(
        {
            date: '',
            startTime: '',
            endTime: '',
            staffId: '',
            index:''
        }
    )
    const [id,setId]=useState([]);

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


    useEffect(() => {
        saveShedule();
    }, [workSheduleInfo])

    if (loading) {
        return <Loader />
    }

    const saveShedule = async () => {
        try {
            const data = await request('/api/shedule/workShedule', 'POST', { ...workSheduleInfo },
                {
                    Authorization: `Bearer ${token}`
                })
            data.message="Save" && setId([...id, parseInt(workSheduleInfo.index)])
        } catch (error) {

        }
    }


    const handleAddStaff = event => {
        event.preventDefault();
        let info = event.target.value.split(" ");
        setWorkSheduleInfo({
            date: info[1],
            startTime: times.startTime,
            endTime: times.endTime,
            staffId: info[0],
            index:info[2]
        })
        console.log(workSheduleInfo)
    }

    let listItems = [
        {
            doctor: '',
            date: '',
            startTime: '',
            endTime: '',
            staffId: ''
        }
    ];

    const handleChange = event => {
        setTimes({ ...times, [event.target.name]: event.target.value })
    }

    const GenerateBody = (list) => {
        console.log(workSheduleInfo);
        let body = list.map((item, index) => {
            console.log(id);
            if(id.includes(index))
            {
                return <tr style={{background:'green'}}>
                <td>{index}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                 </tr>
            }
            return <tr>
                <td>{index}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                <td><input type="time" name="startTime" onChange={handleChange} placeholder={item.startTime} /></td>
                <td><input type="time" name="endTime" onChange={handleChange} placeholder={item.endTime} /></td>
                <td hidden><input type="text" defaultValue={item.staffId} /></td>
                <td><Button value={item.staffId.concat(" " + item.date+" "+index)} onClick={handleAddStaff}>Save</Button></td>
            </tr>
        })
        return body;
    }

    const ShowDoctor = () => {
        let finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + 7)
        doctors.forEach(element => {
            let date = new Date();
            while (date.getDate() < finishDate.getDate()) {
                listItems.push({ doctor: element.name, date: date.toLocaleDateString(), startTime: '09:00', endTime: '18:00', staffId: element.userId })
                date.setDate(date.getDate() + 1);
            }
        });
        listItems.shift();
        let body = GenerateBody(listItems);
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Дата</th>
                        <th>Начало рабочего дня</th>
                        <th>Окончание рабочего дня</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        )
    }
    return (
        <div>
            {!loading && ShowDoctor()}
        </div>
    )
}