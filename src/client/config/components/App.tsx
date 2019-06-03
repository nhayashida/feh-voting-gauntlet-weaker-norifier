import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { initialize, updateSettings } from '../reducers/actions';
import { State } from '../reducers/reducers';
import { Settings } from '../reducers/app/types';
import { Hero } from '../reducers/feh/types';
import { Channel } from '../reducers/slack/types';
import Notification from './Notification';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    '& > h6': {
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
    },
  },
  contentHeader: theme.mixins.toolbar,
  contentBody: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    '& > div': {
      width: '100%',
      [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
        width: 800,
      },
      '& form': {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      },
    },
  },
  progress: {
    visibility: 'hidden',
    '&.loading': {
      visibility: 'unset',
    },
  },
}));

interface Props {
  loading: boolean;
  settings: Settings;
  heroes: Hero[];
  channels: Channel[];
  initialize: typeof initialize;
  updateSettings: typeof updateSettings;
}

const mapStateToProps = (state: State) => ({
  loading: state.app.loading,
  settings: state.app.settings,
  heroes: state.feh.heroes,
  channels: state.slack.channels,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ initialize, updateSettings }, dispatch);

// tslint:disable-next-line:variable-name
const App = (props: Props): JSX.Element => {
  const { loading, settings, heroes, channels } = props;

  const theme = useTheme();
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    props.initialize();
  }, []);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.updateSettings({
      [e.target.name]: e.target.value,
    });
  };

  const selectProps = [
    {
      name: 'hero',
      label: 'Hero',
      value: settings.hero,
      options: heroes.map((item, i) => (
        <MenuItem key={i} value={item.name}>
          {item.name}
        </MenuItem>
      )),
    },
    {
      name: 'channel',
      label: 'Channel',
      value: settings.channel,
      options: channels.map((item, i) => (
        <MenuItem key={i} value={item.id}>
          {item.name}
        </MenuItem>
      )),
    },
  ];
  const selectControls = selectProps.map((item, i) => (
    <FormControl key={i} margin="normal">
      <InputLabel>{item.label}</InputLabel>
      <Select name={item.name} value={item.value} onChange={onSelectChange} disabled={loading}>
        {item.options}
      </Select>
    </FormControl>
  ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
        </Toolbar>
        <LinearProgress className={clsx(classes.progress, { loading })} color="secondary" />
      </AppBar>
      <main>
        <div className={classes.contentHeader} />
        <div className={classes.contentBody}>
          <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={(e: MouseEvent<HTMLButtonElement>) => setExpanded(!expanded)}
            >
              <Typography>General</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form>{selectControls}</form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </main>
      <Notification />
    </ThemeProvider>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
