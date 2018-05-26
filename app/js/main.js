
import React from 'react';
import ReactDOM from 'react-dom';
import career from './contents/career';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const markup = function (doc) { return { __html: doc }; };
class Experiences extends React.Component {
	render() {
		let inStyle = { marginBottom: "30px" }
		let experiences = [];
		this.props.experiences.map(({ jobTitle, during, company, detail }, id) => {
			experiences.push(
				<div className="item" key={id} style={inStyle}>
					<div className="meta">
						<div className="upper-row">
							<h3 className="job-title">{jobTitle}</h3>
							<div className="time">{during}</div>
						</div>
						<div className="company">{company}</div>
					</div>
					<div className="details">
						<div dangerouslySetInnerHTML={markup(detail)} />
					</div>
					<p /><p />
				</div>
			);
		});
		return (
			<section className="section summary-section">
				<h2 className="section-title"><i className="fa fa-briefcase"></i>Experiences</h2>
				{experiences}
			</section>
		);
	}
}
class Career extends React.Component {
	render() {
		let c_style = { whiteSpace: "pre-wrap" };
		return (
			<section className="section summary-section">
				<h2 className="section-title"><i className="fa fa-user"></i>Career Profile</h2>
				<div className="summary">
					<div style={c_style} dangerouslySetInnerHTML={{ __html: this.props.profile }} />
				</div>
			</section>
		);
	}
}

class Project extends React.Component {
	render() {
		let projectType = this.props.projectType;
		let items = [];
		this.props.project.list.map(({ title, company, url, role, during, detail, category, test, score, date }, i) => {
			items.push(
				<div className="item" key={i}>
					<span className="project-title">
						{
							(url != '#') ? <a href={url} target="_blank">{title}</a> : <a>{title}</a>
						}
					</span>
					<div className="upper-row">
						<h3 className="job-title">{company}</h3>
						<div className="time">{during}</div>
					</div>
					<div>{detail}</div>
					<div>{role}</div>
				</div>
			);
		});
		return (
			<section className="section projects-section">
				<h2 className="section-title"><i className="fa fa-archive"></i>{this.props.projectType}</h2>
				<div className="intro">
					<p>{this.props.project.description}</p>
				</div>
				{items}
			</section>
		);
	}
}

class Certification extends React.Component {
	render() {
		let items = [];
		this.props.certification.list.map(({ category, test, level, score, maxScore, date }, i) => {
			items.push(
				<div className="item" key={i}>
					<span className="project-title">
						{<a>{category}</a>}
					</span>
					<div className="upper-row">
						<h3 className="job-title">{test}</h3>
						<div className="time">{date}</div>
					</div>
					<div>

					</div>
					{

						<div className="skillset">
							<h3 className="level-title">
								{
									level ? <div> {level}({score}/{maxScore}) </div> :
										<div>{score ? <div>{score}/{maxScore}</div> : <div />}</div>
								}
							</h3>
							<div>
								{
									score ?
									<div className="level-bar">
										<LevelBar level={(score / maxScore * 100) + '%'} />
									</div>
									:
									<div />
								}
							</div>
						</div>

					}
				</div>
			);
		});
		return (
			<section className="skills-section section">
				<h2 className="section-title"><i className="fa fa-rocket"></i>{this.props.titleType}</h2>
				<div className="intro">
					<p>{this.props.certification.description}</p>
				</div>
				<div className="skillset">
					{items}
				</div>
			</section>
		);
	}
}

class LevelBar extends React.Component {
	componentDidMount() {
		let myEl = ReactDOM.findDOMNode(this.refs.dlevel);
		$(myEl).css('width', '0');
		$(myEl).animate({
			width: this.props.level
		}, 2000);
	}
	render() {
		return (
			<div ref="dlevel" className="level-bar-inner" data-level={this.props.level} />
		);
	}
}
ReactDOM.render(
	<div>
		<Career profile={career.profile} />
		<Experiences experiences={career.experiences} />
		<Project project={career.project} projectType="Project" />
		<Certification certification={career.certification} titleType="Certifications" />
	</div>
	,
	document.getElementById('main')
);
