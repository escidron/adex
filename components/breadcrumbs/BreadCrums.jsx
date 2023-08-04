import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick() {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BreadCrumbs({ path, setPath, setSelectedStep, selectedStep }) {

    if (path.lenght === 0) {
        return null
    }
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    path.map((item) => (

                        <div key={item.step}>
                            <Link underline="hover" color="inherit" href="/" onClick={() => {
                                setSelectedStep(item.step)
                            }}>
                                {item.name}
                            </Link>
                        </div>
                    ))

                }

            </Breadcrumbs>
            {
                selectedStep === 1 && (
                    <p>/</p>
                )
            }
        </div>
    );
}