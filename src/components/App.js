import React from 'react';
import _orderBy from 'lodash/orderBy';
import GameList from './GamesList';
import GameForm from './GameForm';
import TopNavigation from './TopNavigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


const publishers = [
    {
        _id: 1,
        name: "Days of Wonder"
    },
    {
        _id: 2,
        name: "Rio Grande Games"
    }
];

const games = [
    {
        _id: 1,
        publisher: 1,
        featured: true,
        name: "Quadropolis",
        thumbnail: "https://cf.geekdo-images.com/imagepagezoom/img/_8vPsfrLL8yO7VzTQA1VkjTfsqM=/fit-in/1200x900/filters:no_upscale()/pic2840020.jpg",
        price: 3299,
        players: "2-4",
        duration: 60
    },
    {
        _id: 2,
        publisher: 1,
        featured: false,
        name: "Five Tribes",
        thumbnail: "https://cf.geekdo-images.com/imagepagezoom/img/duz9VImXFJLPAOeMfyt-pLzV0dM=/fit-in/1200x900/filters:no_upscale()/pic2055255.jpg",
        price: 5100,
        players: "2-4",
        duration: 80
    },
    {
        _id: 3,
        publisher: 2,
        featured: false,
        name: "Roll for the Galaxy",
        thumbnail: "https://cf.geekdo-images.com/imagepagezoom/img/M6HD1apPIhmhBuvGA8hxPjXGp90=/fit-in/1200x900/filters:no_upscale()/pic1473629.jpg",
        price: 2999,
        players: "2-5",
        duration: 45
    }
];

class App extends React.Component {
    state = {
        games: [],
        showGameForm: false,
        showLoginForm: false,
        showSignupForm: false,
        selectedGame: {}
    };

    componentDidMount() {
        this.setState({ games: this.sortGames(games)});
    }

    sortGames(games) {
        return _orderBy(games, ["featured", "name"], ["desc", "asc"]);
    }

    toggleFeatured = gameId => 
        this.setState({
            games: this.sortGames(
                this.state.games.map(
                    game =>
                        gameId === game._id ? {...game, featured: !game.featured } : game
                )
            )
        });

    showGameForm = () => {
        this.hideLoginForm();
        this.hideSignupForm();
        this.setState({ showGameForm: true, selectedGame: {} });
    }
    showLoginForm = () => {
        this.hideSignupForm();
        this.hideGameForm();
        this.setState({ showLoginForm: !this.state.showLoginForm });
    }
    showSignupForm = () => {
        this.hideLoginForm();
        this.hideGameForm();
        this.setState({ showSignupForm: !this.state.showSignupForm });
    }

    hideGameForm = () => this.setState({ showGameForm: false, selectedGame: {} });
    hideLoginForm = () => this.setState({ showLoginForm: false });
    hideSignupForm = () => this.setState({ showSignupForm: false });    

    selectGameForEditing = game => {
        this.hideLoginForm();
        this.hideSignupForm();
        this.setState({
            selectedGame: game,
            showGameForm: true
        });
    }

    saveGame = game => {
        game._id ? this.updateGame(game) : this.addGame(game);
    }

    updateGame = game => {
        this.setState({
            games: this.sortGames(
                this.state.games.map(item => (item._id === game._id ? game : item))
            ),
            showGameForm: false
        });
    }
        
    addGame = game => {
        this.setState({
            games: this.sortGames([
               ...this.state.games,
               {
                    ...game,
                    _id: this.state.games.length + 1,
               } 
            ]),
            showGameForm: false
        });
    }   
    
    deleteGame = game => {
        this.showLoginForm();
        this.setState({
            games: this.state.games.filter(item => item._id !== game._id)
        });
    }    

    render() {
        const numberOfColumns = (
            this.state.showGameForm || 
            this.state.showSignupForm  || 
            this.state.showLoginForm ) ? "ten" : "sixteen";
        return (
            <div className="ui container">
                <TopNavigation 
                    showGameForm={this.showGameForm}
                    showSignupForm={this.showSignupForm}
                    showLoginForm={this.showLoginForm}
                />
                <div className="ui stackable grid">
                    {this.state.showGameForm && (
                        <div className="six wide column">
                            <GameForm 
                                publishers={publishers} 
                                cancel={this.hideGameForm} 
                                submit={this.saveGame}
                                game={this.state.selectedGame}
                            />
                        </div>
                    )}
                    {this.state.showSignupForm && (
                        <div className="six wide column">
                            <SignupForm cancel={this.hideSignupForm} />
                        </div>
                    )}
                    {this.state.showLoginForm && (
                        <div className="six wide column">
                            <LoginForm cancel={this.hideLoginForm} />
                        </div>
                    )}
                    <div className={`${numberOfColumns} wide column`}>
                        <GameList 
                            games={this.state.games}
                            toggleFeatured={this.toggleFeatured} 
                            editGame={this.selectGameForEditing}
                            deleteGame={this.deleteGame}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default App;