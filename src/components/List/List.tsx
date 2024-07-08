import { useEffect, useState } from "react"
import axiosApi from "../../axios-api"
import { Meals } from "../../types"

const List=()=>{

    const [total, setTotal] = useState(0)
    const [loading,setLoading] = useState(false)
    const [meals, setMeals] = useState<Meals[]>()

    const getListMeal = async()=>{
        setLoading(true);
        
        try {
            const response = await axiosApi.get('/products.json');
            const mealsCopy = [];
            for (let key in response.data) {
                const onePost = { meal: response.data[key].meal, calories: response.data[key].calories, time: response.data[key].time,};
                mealsCopy.push(onePost);
            }
            setMeals(mealsCopy)
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        void getListMeal()
    },[])

    return(
        <>
            <div className="container">
                <div className="d-flex py-3 justify-content-between">
                    <div className="">
                        Total calories: {total} kcal
                    </div>
                    <button className="btn btn-dark">
                        Add new meal
                    </button>
                </div>
                <ul className="list-group">
                    {meals?.map((meal, index)=>{
                        return(
                            <li key={index} className="list-group-item d-flex align-items-center">
                                <div className="">
                                    <span className="d-block fs-6 text-body-secondary">{meal.time}</span>
                                    <span className="d-block fs-4">{meal.meal}</span>
                                </div>
                                <div className="ms-auto me-5 fs-3">
                                    {meal.calories} kcal
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <button className="btn btn-dark">Edit</button>
                                    <button className="btn btn-dark">Delete</button>
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