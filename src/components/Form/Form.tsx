import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axios-api";
import ButtonSpinner from "../Spinner/Spinner";

const Form=()=>{

    const param = useParams();
    const navigate = useNavigate();

    const [time, setTime] = useState('Breakfast');
    const [meal, setMeal] = useState('');
    const [calories, setCalories] = useState('');
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date>();

    const getListMeal = async()=>{
        setLoading(true);
        try {
            const response = await axiosApi.get('/meals/'+ param.id +'.json');
            setTime(response.data.time);
            setMeal(response.data.meal);
            setCalories(String(response.data.calories));
            setDate(response.data.date);
        } finally {
            setLoading(false);
        }
    }

    let title = 'Add';

    if (param.id !== undefined) {
        title = 'Edit';
        useEffect(()=>{
            void getListMeal();
        }, [param.id]);
    }

 
    const getValue = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, state: (value:string)=>void)=>{
        state(event.target.value);
    }

    const addMeal = async(event: React.FormEvent)=>{
        event.preventDefault();
        setLoading(true);
        try {
            if (meal.trim() === '' || meal.trim() === null || calories.trim() === '' || calories.trim() === null) {
                alert('Заполните поля ниже!');
            }
            else{
                if (param.id === undefined) {                
                    const newMeal = {
                        time: time,
                        calories: Number(calories),
                        meal: meal,
                        date: new Date(),
                    }
                    const response = await axiosApi.post('/meals.json', newMeal);
                    navigate('/');
                }
                else{
                    const newMeal = {
                        time: time,
                        calories: Number(calories),
                        meal: meal,
                        date: date,
                    }
                    const response = await axiosApi.put('/meals/' + param.id + '.json', newMeal);
                }
            }
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
        );
    }

    return(
        <>
            {preloader}
            <form onSubmit={addMeal}>
                <div className="container">
                    <h3 className="text-center mt-4 mb-3">{title} meal</h3>
                    <select className="form-select mb-3" onChange={(event:ChangeEvent<HTMLSelectElement>)=>{getValue(event, setTime)}} value={time}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snack">Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    <div className="mb-3">
                        <label className="form-label">Meal description</label>
                        <input type="text" value={meal} onChange={(event:ChangeEvent<HTMLInputElement>)=>{getValue(event, setMeal)}} className="form-control"/>
                    </div>
                    <div className="mb-3" style={{maxWidth: '300px'}}>
                        <label className="form-label">Calories</label>
                        <input type="number" value={calories} onChange={(event:ChangeEvent<HTMLInputElement>)=>{getValue(event, setCalories)}} min="1" className="form-control"/>
                    </div> 
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                        {loading && <ButtonSpinner/>}
                        {loading ? 'Update' : 'Save'}
                    </button>
                    <NavLink to="/" className='ms-3 btn btn-danger'>Exit</NavLink>
                </div>
            </form>
        </>
    )
}

export default Form;