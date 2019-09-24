/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, Navigation } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    activeIssueFilter: 'open',
    activePage: 1,
    issueFilter: [
      { type: 'all', label: 'Todas' },
      { type: 'open', label: 'Abertas' },
      { type: 'closed', label: 'Fechadas' },
    ],
  };

  async componentDidMount() {
    const { activeIssueFilter } = this.state;

    const [repository, issues] = await this.getRepoInfo(activeIssueFilter);

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  async getRepoInfo(activeIssueFilter, page = 0) {
    const { match } = this.props;
    const { activePage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const pageNum = page !== 0 ? page : activePage;

    const r = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: activeIssueFilter,
          per_page: 5,
          page: pageNum,
        },
      }),
    ]);
    return r;
  }

  async handleFilter(filterType) {
    this.setState({ loading: true });

    const [repository, issues] = await this.getRepoInfo(filterType);

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
      activeIssueFilter: filterType,
    });
  }

  async goToPage(pageNum) {
    const { activeIssueFilter } = this.state;
    this.setState({ loading: true });

    const [repository, issues] = await this.getRepoInfo(
      activeIssueFilter,
      pageNum
    );

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
      activePage: pageNum,
    });
  }

  render() {
    const { repository, issues, loading, issueFilter, activePage } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter>
          <li>Filtrar:</li>
          {issueFilter.map(filter => {
            return (
              <li key={filter.type}>
                <button
                  type="button"
                  onClick={() => {
                    this.handleFilter(filter.type);
                  }}
                >
                  {filter.label}
                </button>
              </li>
            );
          })}
        </IssueFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Navigation>
          <button
            type="button"
            disabled={activePage < 2}
            onClick={() => this.goToPage(activePage - 1)}
          >
            <FaArrowLeft />
          </button>
          <span>Página {activePage}</span>
          <button type="button" onClick={() => this.goToPage(activePage + 1)}>
            <FaArrowRight />
          </button>
        </Navigation>
      </Container>
    );
  }
}
