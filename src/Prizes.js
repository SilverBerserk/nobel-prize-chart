import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { get } from './api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Prizes = () => {
    const [prizes,setPrizes] = useState([])
    const [load,setLoad] = useState(true)

  useEffect(() => {
    setLoad(true)
    get()
    .then(res => {
      setPrizes(res.nobelPrizes)})
    .catch(err => console.error(err))
    .finally(()=> setLoad(false))
  }, [])

  let prizesSum = {}
  prizes.length && prizes.forEach(element => {
    console.log(prizesSum)
    prizesSum[element.awardYear] =(prizesSum[element.awardYear] ?? 0) + element.prizeAmount  
  });


    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    return <LineChart
                loading={load}
                onMarkClick={(e,i)=>console.log(e,i)}
                xAxis={[{ data: Object.keys(prizesSum) }]}
                series={[{ data: Object.values(prizesSum) }]}
                width={500}
                height={300}/>
}

export default Prizes