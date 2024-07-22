import { useState } from "react"
import { Button, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { getLaureates } from "./api"

const LaureateOverviewDetails = ({ details }) => {
    return details && <Card sx={{ minHeight: '200px' }}>
        <CardHeader title={`Prizes won: ${details.nobelPrizes.length}`} subheader={details.nobelPrizes.map(e=> e.links.filter(link => link.rel==='nobelPrize').map((link,i) => <a key={i} href={link.href}>{link.href}</a>))} />
        <CardContent >
            {/* <Typography variant="h5" color="text.secondary">{`Prizes won: ${details.fullName.en}`}</Typography> */}
            <Typography variant="h5" color="text.secondary">{`Prize details:`}</Typography>
            <Typography variant="h6" color="text.secondary">
                {details.nobelPrizes.map((e,i)=>
                    <div key={i}> 
                        <li style={{listStyle:'none'}}>{`${e.awardYear} ${e.categoryFullName.en} ${e.afiliation??''} ${e.motivation.en??''}`}</li>
                        <li style={{listStyle:'none'}}>{`Prize award: ${e.prizeAmount}`}</li>
                    </div>
                )}
            </Typography>
            
            <Typography variant="h5" color="text.secondary">{`Birth Date: ${details.birth.date}`}</Typography>
            {details.death?.date && <Typography variant="h5" color="text.secondary">{`Death Date: ${details.death.date}`}</Typography>}


        </CardContent>
    </Card>
}

const LaureateOverview = () => {
    const [laureates, setLaureates] = useState([])

    const [load, setLoad] = useState({ loadPrizes: true, loadLaureates: true })
    const [value,setValue] = useState('')
    const [searchBy, setSearchBy] = useState('name')
    const [dialog, setDialog] = useState({})


    const handleGetLaureates = (value,searchBy) => {
        setLoad(true)
        getLaureates({[searchBy]:value})
            .then(res => setLaureates(res.laureates))
            .catch(err => console.error(err))
            .finally(() => setLoad(false))

    }

    const handleSearch = (e) => {
        e.preventDefault()
        handleGetLaureates(value,searchBy)
    }

    const handleChangeSearchBy = (e) => {
        console.log(e)
        setSearchBy(e.target.value)
    }


    const handleShowLaureate = (e) => {
        setDialog({open:true,data:e})
    }

    const handleDialogClose = () => {
        setDialog(e=> ({...e, open: false}))
    }


    return (
        <Stack display='flex' flexDirection='column' alignItems='center' gap={3} sx={{mt:3}}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Search By</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    value={searchBy}
                    onChange={handleChangeSearchBy}
                    row
                >
                    <FormControlLabel value="name" control={<Radio />} label="Name" />
                    <FormControlLabel value="residence" control={<Radio />} label="Residence" />
                </RadioGroup>
            </FormControl>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={ev => ev.key === 'Enter' && handleSearch(ev)}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
            
           {load ? <CircularProgress/> : <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Full Name
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {laureates.map(e=><TableRow key={e.id} hover onClick={() => handleShowLaureate(e)}>
                            <TableCell>{e.id}</TableCell>
                            <TableCell>{e.fullName?.en ?? e.orgName?.en}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Card>}
            <Dialog
                open={!!dialog.open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='paper'
            >
            <DialogTitle id="alert-dialog-title">
                {dialog.data?.fullName?.en}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <LaureateOverviewDetails key={dialog.data?.id} details={dialog.data} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </Stack>
    )
}

export default LaureateOverview