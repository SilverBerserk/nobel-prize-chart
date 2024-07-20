import { LineChart } from '@mui/x-charts';
import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const PrizeDetails = ({ details }) => {
    return <Card sx={{ minHeight: '200px' }}>
        <CardHeader subheader={details.laureates.map(e => e.fullName?.en).join(', ')} title={details.categoryFullName?.en} />
        <CardContent ><Typography variant="h5" color="text.secondary">{`Award: ${details.prizeAmountAdjusted}$`}</Typography> </CardContent>
    </Card>
}

const Prizes = ({ data, load }) => {
    const [dialog, setDialog] = useState({})

    let prizesSum = {}
    data.length && data.forEach(element => {
        prizesSum[element.awardYear] = (prizesSum[element.awardYear] ?? 0) + element.prizeAmount
    });



    const handleMarkClick = (id) => {
        setDialog({ open: true, header: { year: Object.keys(prizesSum)[id], sum: Object.values(prizesSum)[id] }, data: data.filter(e => e.awardYear == Object.keys(prizesSum)[id]) })
    }

    const handleDialogClose = () => {
        setDialog({ open: false })
    }


    return <>
        <LineChart
            loading={load}
            onMarkClick={(e, i) => handleMarkClick(i.dataIndex)}
            xAxis={[{
                data: Object.keys(prizesSum).map(e => new Date(e, 0, 1)),
                scaleType: 'time',
                valueFormatter: (value) => value.getFullYear().toString(),
            }]}

            series={[{ data: Object.values(prizesSum) }]}
            width={500}
            height={300} />
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
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {dialog.data?.map((e, i) => <PrizeDetails key={'deatil' + i} details={e} />)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
        </Dialog>

    </>
}

export default Prizes