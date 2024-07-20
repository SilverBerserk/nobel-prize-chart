import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { Slider, Stack } from "@mui/material"
import { getLaureates, getPrizes } from "./api"
import Prizes from "./Prizes"
import Laureates from "./Laureates"
import CategoryPie from "./CategoryPie"


const PrizeOverview = () => {
    const [prizes, setPrizes] = useState([])
    const [laureates, setLaureates] = useState([])

    const [load,setLoad] = useState({loadPrizes:true,loadLaureates:true})
    const [yearRange, setYearRange] = useState([1904,1906])

    const [years] = useDebounce(yearRange,1000)


    const handleGetPrizes = (years) => {
        setLoad(e=>({...e, loadPrizes: true}))
        const params = {nobelPrizeYear:years[0],yearTo:years[1],limit:9999}
        getPrizes(params)
            .then(res => {
                console.log(res)
                setPrizes(res.nobelPrizes)})
            .catch(err => console.error(err))
            .finally(()=> setLoad(e=>({...e, loadPrizes:false})))

    }

    const handleGetLaureates = () => {
        setLoad(e=>({...e, loadLaureates: true}))
        const params = {nobelPrizeYear:years[0],yearTo:years[1],limit:9999}
        getLaureates(params)
            .then(res => setLaureates(res.laureates))
            .catch(err => console.error(err))
            .finally(()=> setLoad(e=>({...e, loadLaureates:false})))

    }

    useEffect(() => {
        handleGetPrizes(years)
        handleGetLaureates(years)
        }, [years])


    const handleYearRangeChange = (event, value) => {
        setYearRange(value)
    }

    return (
        <Stack>
            <Slider
                getAriaLabel={() => 'Years range'}
                // getAriaValueText={e=>e}
                value={yearRange}
                onChange={handleYearRangeChange}
                min={1901}
                max={2024}
                marks={[{value:10,label:1901},{value:90,label:2024}]}
                valueLabelDisplay="on"
                disabled={load.loadPrizes || load.loadLaureates}
                // getAriaValueText={(value) => `{valuetext}`}
            />
            <Prizes data={prizes} load={load.loadPrizes}/>
            <Laureates data={laureates} load={load.loadLaureates}/>
            <CategoryPie data={prizes} load={load.loadPrizes}/>
        </Stack> 
    )
}

export default PrizeOverview