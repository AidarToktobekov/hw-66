import { useEffect, useState } from "react"
import axiosApi from "../../axios-api"
import { Meals } from "../../types"
import { NavLink } from "react-router-dom"

const List=()=>{

    const [total, setTotal] = useState(0)
    const [loading,setLoading] = useState(false)
    const [clicker,setСlicker] = useState(false)
    const [meals, setMeals] = useState<Meals[]>()

    const getListMeal = async()=>{
        setLoading(true);
        setTotal(0);
        
        try {
            const response = await axiosApi.get('/meals.json');
            const mealsCopy = [];
            for (let key in response.data) {
                const onePost = {id: key, meal: response.data[key].meal, calories: response.data[key].calories, time: response.data[key].time,};
                mealsCopy.push(onePost);
                setTotal(prev=>prev + response.data[key].calories);
            }
            setMeals(mealsCopy)
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        void getListMeal()
    },[clicker])

    const deleteMeal =async(key:string)=>{
        setLoading(true);
        
        try {
            await axiosApi.delete('/meals/'+ key +'.json');
            setСlicker(prev=>!prev)
            
        } finally {
            setLoading(false);
        }
    }
    let preloader = null;
    if (loading) {
        preloader = (
          <>
              <div id="preloader">
                <div className="loader"></div>
              </div>
          </>
        )
      }

    return(
        <>
        {preloader}
            <div className="container">
                <div className="d-flex py-3 justify-content-between">
                    <div className="">
                        Total calories: {total} kcal
                    </div>  
                    <NavLink to="/Add-meal" className='btn btn-dark'>Add new meal</NavLink>
                </div>
                <ul className="list-group">
                    {meals?.map((meal, index)=>{
                        return(
                            <li key={index} className="list-group-item border-3 d-flex mb-3 align-items-center">
                                <div className="">
                                    <span className="d-block fs-6 text-body-secondary">{meal.time}</span>
                                    <span className="d-block fs-4">{meal.meal}</span>
                                </div>
                                <div className="ms-auto me-5 fs-3">
                                    {meal.calories} kcal
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <NavLink to={"/edit-meal/" + meal.id} className="btn btn-dark">Edit</NavLink>
                                    <button className="btn btn-dark" onClick={()=>deleteMeal(meal.id)}>Delete</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default List