
import { styled } from '@mui/system';
import { Container, Typography } from '@mui/material';
export const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

export const StyledSectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));