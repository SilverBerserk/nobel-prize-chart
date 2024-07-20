import { useState } from "react"
import { Button, ButtonGroup, Card, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { getLaureates } from "./api"


const LaureateOverview = () => {
    const [laureates, setLaureates] = useState([])

    const [load, setLoad] = useState({ loadPrizes: true, loadLaureates: true })
    const [value,setValue] = useState('')
    const [searchBy, setSearchBy] = useState('name')

    const handleGetLaureates = (value,searchBy) => {
        setLoad(e => ({ ...e, loadLaureates: true }))
        getLaureates({[searchBy]:value})
            .then(res => setLaureates(res.laureates))
            .catch(err => console.error(err))
            .finally(() => setLoad(e => ({ ...e, loadLaureates: false })))

    }

    const handleSearch = () => {
        handleGetLaureates(value,searchBy)
    }

    const handleChangeSearchBy = (e) => {
        console.log(e)
        setSearchBy(e.target.value)
    }


    return (
        <Stack display='flex' flexDirection='column' alignItems='center'>
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
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
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
            <Card>
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
                        {laureates.map(e=><TableRow key={e.id} hover onClick={() => console.log(e)}>
                            <TableCell>{e.id}</TableCell>
                            <TableCell>{e.fullName?.en ?? e.orgName?.en}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Card>
        </Stack>
    )
}

export default LaureateOverview