import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { getPrizes } from './api';
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import Slider from '@mui/material/Slider'
import { useDebounce } from 'use-debounce';

const PrizeDetails = ({details}) => {
    return <Card sx={{minHeight:'200px'}}>
        <CardHeader subheader={details.laureates.map(e=>e.fullName?.en).join(', ')}  title={details.categoryFullName?.en} />
            <CardContent ><Typography variant="h5" color="text.secondary">{`Award: ${details.prizeAmountAdjusted}$`}</Typography> </CardContent>
    </Card>
}

const Prizes = () => {
    const [prizes,setPrizes] = useState([])
    const [load,setLoad] = useState(true)
    const [dialog,setDialog] = useState({})
    const [yearRange, setYearRange] = useState([1904,1906])

    const [years] = useDebounce(yearRange,1000)

    useEffect(() => {
        setLoad(true)
        const params = {nobelPrizeYear:years[0],yearTo:years[1],limit:9999}
        getPrizes(params)
        .then(res => {
        setPrizes(res.nobelPrizes)})
        .catch(err => console.error(err))
        .finally(()=> setLoad(false))
    }, [years])

    let prizesSum = {}
    prizes.length && prizes.forEach(element => {
        prizesSum[element.awardYear] =(prizesSum[element.awardYear] ?? 0) + element.prizeAmount  
    });

    

    const handleMarkClick = (id) => {
        setDialog({open:true,header:{year:Object.keys(prizesSum)[id],sum: Object.values(prizesSum)[id]},data:prizes.filter(e => e.awardYear == Object.keys(prizesSum)[id])})
    }

    const handleDialogClose = () => {
        setDialog({open:false})
    }

    const handleYearRangeChange = (event, value) => {
        setYearRange(value)
    }



    return <Stack direction='column' sx={{margin:4}}>
                <Slider
                    getAriaLabel={() => 'Years range'}
                    // getAriaValueText={e=>e}
                    value={yearRange}
                    onChange={handleYearRangeChange}
                    min={1901}
                    max={2024}
                    marks={[{value:10,label:1901},{value:90,label:2024}]}
                    valueLabelDisplay="on"
                    disabled={load}
                    // getAriaValueText={(value) => `{valuetext}`}
                />
                <LineChart
                            loading={load}
                            onMarkClick={(e,i)=>handleMarkClick(i.dataIndex)}
                            xAxis={[{ 
                                data: Object.keys(prizesSum).map(e=> new Date(e,0,1)) ,
                                scaleType:'time',
                                valueFormatter: (value) => value.getFullYear().toString(),}]}
                            
                            series={[{ data: Object.values(prizesSum) }]}
                            width={500}
                            height={300}/>
                <Dialog
                    open={!!dialog.open}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    scroll='paper'
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Year ${dialog.header?.year}, ${dialog.header?.sum}$`}
                    </DialogTitle>
                    <DialogContent sx={{display:'flex', flexDirection:'column', gap:3}}>
                        {dialog.data?.map((e,i)=><PrizeDetails key={'deatil'+i} details={e}/>)}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>

            </Stack>
}

export default Prizes