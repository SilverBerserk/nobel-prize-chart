import { LineChart } from '@mui/x-charts';
import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const LaureateDetails = ({details}) => {
    return <Card sx={{minHeight:'200px'}}>
        <CardHeader title={details.fullName?.en}  subheader={`${[details.birth?.date,details.death?.date].join('  -  ')}`} />
            <CardContent ><Typography variant="h5" color="text.secondary">{`Nobel Prizes: ${details.nobelPrizes.length}`}</Typography>
        </CardContent>
    </Card>
}

const Laureates = ({data, load}) => {
    const [dialog,setDialog] = useState({})

    const laureatesCount = data.length && data.map(e=>({id:e.id,years:e.nobelPrizes.map(a => a.awardYear)}))
    let ll = {}
    laureatesCount.length && laureatesCount.map(e=>e.years).flat().forEach(element => {
        ll[element] = (ll[element] ?? 0) + 1
    });


    const handleMarkClick = (id) => {
        setDialog({open:true,header:{year:Object.keys(ll)[id],sum: Object.values(ll)[id]},data:data.filter(e => e.nobelPrizes.find(y => y.awardYear == Object.keys(ll)[id]))})
    }

    const handleDialogClose = () => {
        setDialog({open:false})
    }


    return <>
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
                    scroll='paper'
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Year ${dialog.header?.year}, ${dialog.header?.sum} Laureates`}
                    </DialogTitle>
                    <DialogContent sx={{display:'flex', flexDirection:'column', gap:3}}>
                        {dialog.data?.map((e,i)=><LaureateDetails key={'deatil'+i} details={e}/>)}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
}

export default Laureates