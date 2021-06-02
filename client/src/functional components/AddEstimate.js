import { useParams } from 'react-router-dom'
import { Container, Table, Button } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

export function AddEstimate() {
    const { id } = useParams();
    const { request, loading } = useHttp()
    const [material, setMaterial] = useState([{
        name: '',
        count: ''
    }])
    const [materialList, setMaterialList] = useState([]);
    const [priceList, setPriceList] = useState([])
    const [checkedMaterial,setCheckedMaterial]=useState([]);
    const [checkedPrice,setCheckedPrice]=useState([]);
    const [message,setMessage]=useState('');

    const [price, setPrice] = useState([{
        nameServise: '',
        coust: ''
    }])

    const handleGetMaterial = useCallback(async () => {
        try {
            const data = await request(`/api/material/all`, 'GET', null)
            setMaterial(data)
            let array=[]
            for(let i=0;i<data.length;i++)
            {
                array.push(false);
            }
            setCheckedMaterial(array)
        } catch (error) {

        }
    }, [request])

    const handleGetPrice = useCallback(async () => {
        try {
            const data = await request(`/api/priceList/all`, 'GET', null)
            setPrice(data)
            let array=[]
            for(let i=0;i<data.length;i++)
            {
                array.push(false);
            }
            setCheckedPrice(array)
        } catch (error) {

        }
    }, [request])

    useEffect(() => {
        handleGetMaterial()
        handleGetPrice()
    }, [handleGetMaterial, handleGetPrice])

    if (loading) {
        return <Loader />
    }

    const handleCheckedMaterial = (event) => {
        let items = checkedMaterial;
        items[event.target.id]=!items[event.target.id]
        setCheckedMaterial(items);

        if (checkedMaterial[event.target.id]) materialList.push(material[parseInt(event.target.name)])
        else {
            let index = materialList.findIndex(item => item._id == material[parseInt(event.target.name)]._id)
            materialList.splice(index, 1)
        }
        console.log(materialList)
    }

    const handleCheckedPrice = (event) => {
        let items = checkedPrice;
        items[event.target.id]=!items[event.target.id]
        setCheckedPrice(items);

        if (checkedPrice[event.target.id]) priceList.push(price[parseInt(event.target.name)])
        else {
            let index = priceList.findIndex(item => item._id == price[parseInt(event.target.name)]._id)
            priceList.splice(index, 1)
        }
        console.log(priceList)
    }

    const renderMaterial = () => {
        if (!material && !material.length) {
            return <p>Haven't price list</p>
        }

        let itemList = material.map((item, index) => {
            return (
                <tr>
                    <td>{index}</td>
                    <td><input type="checkbox" value={checkedMaterial[index]} id={index} name={index} onChange={event => handleCheckedMaterial(event)} /></td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                </tr>
            )
        })
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>checked</th>
                        <th>name</th>
                        <th>count</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </Table>
        )
    }

    const renderPrice = () => {
        if (!price && !price.length) {
            return <p>Haven't price list</p>
        }

        let itemList = price.map((item, index) => {
            return (
                <tr>
                    <td>{index}</td>
                    <td><input type="checkbox" value={checkedPrice[index]} id={index} name={index} onChange={event => handleCheckedPrice(event)} /></td>
                    <td>{item.nameServise}</td>
                    <td>{item.coust}</td>
                </tr>
            )
        })
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>check</th>
                        <th>name</th>
                        <th>coust</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </Table>
        )
    }

    const handleSave=()=>
    {
        try {
            const dataMaterial = request('/api/material/change/','POST',{...materialList});
            const dataEstimate = request(`/api/estimate/${id}`,'POST',{...priceList.concat(materialList)})
            if(dataMaterial && dataEstimate) setMessage('Save');
        } catch (error) {
            
        }
    }
    if(message)
    {
        return <p>Estimate Save</p>
    }

    return (
        <Container>
            {!loading && renderPrice()}
            <p>Материалы</p>
            {!loading && renderMaterial()}
            <Button onClick={handleSave}>Sent</Button>
        </Container>
    )
}
