import { PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { getPrizes } from './api';
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import Slider from '@mui/material/Slider'
import { useDebounce } from 'use-debounce';

const PrizeDetails = ({ details }) => {
    return <Card sx={{ minHeight: '200px' }}>
        <CardHeader subheader={details.laureates.map(e => e.fullName?.en).join(', ')} title={details.categoryFullName?.en} />
        <CardContent ><Typography variant="h5" color="text.secondary">{`Award: ${details.prizeAmountAdjusted}$`}</Typography> </CardContent>
    </Card>
}

const CategoryPie = ({ data, load }) => {

    let prizesSum = {}
    data.length && data.forEach(element => {
        prizesSum[element.category.en] = (prizesSum[element.category.en] ?? 0) + 1
    });

    const pieData = Object.entries(prizesSum).map(([key, val], i) => ({ id: i, label: key, value: val }))



    return <PieChart
        loading={load}
        series={[{
            data: pieData,
            paddingAngle: 5,
            cornerRadius: 5,
            innerRadius: 30,
        }]}
        width={500}
        height={300} />
}

export default CategoryPie