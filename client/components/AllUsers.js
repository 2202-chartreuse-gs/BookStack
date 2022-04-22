import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../store/users'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '133%',
    backgroundSize: 'contain',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    backgroundColor: 'chartreuse',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const AllUsers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])
  let users = useSelector((state) => state.users)
  const classes = useStyles()
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {users ? (
          users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Link href={'/users/' + user.id}>
                <Card className={classes.card}>
                  {/* <CardMedia
                      className={classes.cardMedia}
                      image={product.imageURL}
                      title={product.title + ' cover'}
                    /> */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.fullName}
                    </Typography>
                    <Typography>
                      {user.isAdmin ? 'Administrator' : 'Customer'}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </CardActions> */}
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <h5>
            No users found. You may not have the necessary credentials to view
            this page.
          </h5>
        )}
      </Grid>
    </Container>
  )
}

export default AllUsers
