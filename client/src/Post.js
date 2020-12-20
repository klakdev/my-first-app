import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
    },
    media: {
      height: 0,
      paddingTop: '40%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

/**
 * @typedef {object} Post
 * @property {string} props.text 
 * @property {object[]} props.media 
 * @property {string} props.media.url 
 * @property {string} props.media.type
 * @property {string} props.date 
 */

/**
 * 
 * @param {object} props 
 * @param {User} props.user 
 * @param {Post} props.post
 */
export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { user, post } = props;
  const expandable = post.text.length > 65;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar 
            src={user.profilePicture}
          >
            {user.firstName.substr(0, 1) + user.lastName.substr(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={post.date}
      />
      <Carousel 
        NavButtonsAlwaysInvisible={post.media.length <= 1}
        indicators={false}
        animation={"fade"}
        timeout={750}
        autoPlay={false}
      >
        {post.media.map((media) => {
          return (
            <CardMedia
              className={classes.media}
              image={media.url}
              title={media.title}
            />
          )
        })}
      </Carousel> 
      <Collapse in={!expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {expandable ? post.text.substr(0, 65) : post.text}
          </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {post.text}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          display={expandable ? "visible" : "none"}
        >
          <ExpandMoreIcon 
            
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}