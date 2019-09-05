import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Loading from '../../Components/Loading';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    loadingMore: false,
    refreshingList: false,
    page: 1,
  };

  componentDidMount = async () => {
    const response = await this.getUserStars();

    this.setState({
      stars: response.data,
      loading: false,
    });
  };

  loadMore = async () => {
    let { page, stars } = this.state;

    page++;

    const response = await this.getUserStars(page);

    this.setState({
      stars: [...stars, ...response.data],
      loadingMore: false,
      page,
    });
  };

  getUserStars = async (page = 1, refresing = false) => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    if (page === 1) {
      this.setState({ loading: true });
    } else {
      this.setState({ loadingMore: true });
    }

    if (refresing) this.setState({ refreshingList: true });

    return await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });
  };

  refreshList = async () => {
    const response = await this.getUserStars(1, true);

    this.setState({
      stars: response.data,
      refreshingList: false,
      loading: false,
      page: 1,
    });
  };

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, loadingMore, refreshingList } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshingList} // Variável que armazena um estado true/false que representa se a lista está atualizando
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens
            data={stars}
            keyExtractor={star => String(star.id)}
            loadingMore={loadingMore}
            renderItem={({ item }) => (
              <Starred
                onPress={() => {
                  this.handleNavigate(item);
                }}
              >
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
