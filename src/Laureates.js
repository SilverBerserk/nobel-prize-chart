import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { getLaureates } from './api';
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import Slider from '@mui/material/Slider'
import { useDebounce } from 'use-debounce';

const PrizeDetails = ({details}) => {
    console.log(details)
    return <Card>
        <CardHeader title={details.fullName?.en}  subheader={`${[details.birth?.date,details.death?.date].join('  -  ')}`} />
            <CardContent ><Typography variant="h5" color="text.secondary">{`Nobel Prizes: ${details.nobelPrizes.length}`}</Typography>
        </CardContent>
    </Card>
}

const Laureates = () => {
    const [laureates,setLaureates] = useState([])
    const [load,setLoad] = useState(true)
    const [dialog,setDialog] = useState({})
    const [yearRange, setYearRange] = useState([1904,1906])

    const [years] = useDebounce(yearRange,1000)

    useEffect(() => {
        setLoad(true)
        const params = {nobelPrizeYear:years[0],yearTo:years[1],limit:9999}
        getLaureates(params)
        .then(res => {
        setLaureates(res.laureates)})
        .catch(err => console.error(err))
        .finally(()=> setLoad(false))
    }, [years])

    let laureatesCount = laureates.length && laureates.map(e=>({id:e.id,years:e.nobelPrizes.map(a => a.awardYear)}))
    console.log('laureatesCount',laureatesCount)
    let ll = {}
    laureatesCount.length && laureatesCount.map(e=>e.years).flat().forEach(element => {
        ll[element] = (ll[element] ?? 0) + 1
    });

    console.log(ll)

    const handleMarkClick = (id) => {
        setDialog({open:true,header:{year:Object.keys(ll)[id],sum: Object.values(ll)[id]},data:laureates.filter(e => e.nobelPrizes.find(y => y.awardYear == Object.keys(ll)[id]))})
    }

    const handleDialogClose = () => {
        setDialog({open:false})
    }

    const handleYearRangeChange = (event, value) => {
        setYearRange(value)
    }


    console.log(dialog.data)

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
                                data: Object.keys(ll).map(e=> new Date(e,0,1)) ,
                                scaleType:'time',
                                valueFormatter: (value) => value.getFullYear().toString(),}]}
                            
                            series={[{ data: Object.values(ll) }]}
                            width={500}
                            height={300}/>
                <Dialog
                    open={!!dialog.open}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Year ${dialog.header?.year}, ${dialog.header?.sum} Laureates`}
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

export default Laureates