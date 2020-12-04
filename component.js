'use strict';

const e = React.createElement;

const min_hrs = null
const max_hrs = null
const sort_opts = ["quickest to most time-intensive", "most time-intensive to quickest"]
const label_opts = ["all", "school", "work", "personal"]
const colors = {"school": "#FFAD99", "work": "#FFCDAD", "personal": "#FFADDD", "school_d": "#E02D00", "work_d": "#CC4E00", "personal_d": "#E00083"}

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        label: label_opts[0],
        minHrs: min_hrs,
        maxHrs: max_hrs,
        sortBy: sort_opts[0],
        options: [
            {
                id: 0,
                img: "https://www.publicdomainpictures.net/pictures/80000/velka/clipart-butterfly-3.jpg",
                name: "UIUX project",
                hours: 13,
                label: "school",
                loc: "metcalf"
            },
            {
                id: 1,
                img: "https://free.clipartof.com/1698-Free-Clipart-Of-A-Shop-Broom.jpg",
                name: "Clean room",
                hours: 2,
                label: "personal",
                loc: "home"
            },
            {
                id: 2,
                img: "https://collegemapper-blog.s3.amazonaws.com/blog/wp-content/uploads/2014/05/Good_Grade.png",
                name: "Grade latest homework",
                hours: 4,
                label: "work",
                loc: "cit"
            },
            {
                id: 3,
                img: "https://clipartion.com/wp-content/uploads/2015/11/science-beaker-clipart-free-clip-art-images.png",
                name: "Weekly research",
                hours: 10,
                label: "work",
                loc: "lab"
            },
            {
                id: 4,
                img: "http://www.clker.com/cliparts/f/d/3/f/1517989003711729291computer-clipart-transparent-1.png",
                name: "Programming langs homework",
                hours: 8,
                label: "school",
                loc: "friend's house"
            },
            {
                id: 5,
                img: "https://clipartion.com/wp-content/uploads/2015/12/present-clipart1.png",
                name: "Wrap holiday presents",
                hours: 3,
                label: "personal",
                loc: "home"
            },
            {
                id: 6,
                img: "https://img.redro.pl/fototapety/dziewczynka-gotowanie-400-22170454.jpg",
                name: "Meal prep",
                hours: 4,
                label: "personal",
                loc: "kitchen"
            },
            {
                id: 7,
                img: "https://static.vecteezy.com/system/resources/previews/000/514/321/original/vector-shopping-cart-with-purchases-and-foods.jpg",
                name: "Grocery shop",
                hours: 2,
                label: "personal",
                loc: "store"
            },
            {
                id: 8,
                img: "https://lh3.googleusercontent.com/proxy/bsQziLiPqPorbL52A-MBLN7wvNJrKyYXn9qOrK7qHseJOwSW9MJRwwGjgvXHGqDpW9M13B2RsPZKqmhXplhh8Q-NcczbUYo",
                name: "Onboard new TAs",
                hours: 7,
                label: "school",
                loc: "cit"
            },
            {
                id: 9,
                img: "http://clipart-library.com/newhp/kisspng-binary-code-binary-number-clip-art-binary-cliparts-5a87e3ed8e7668.2637438415188551495835.jpg",
                name: "Deep learning final",
                hours: 26,
                label: "school",
                loc: "sayles"
            },
            {
                id: 10,
                img: "https://www.netclipart.com/pp/m/89-893403_calender-months-passing-clip-art-calendar-gif.png",
                name: "Log weekly hours",
                hours: 1,
                label: "work",
                loc: "lab"
            },
            {
                id: 11,
                img: "https://www.downloadclipart.net/large/21168-blue-flower-design.png",
                name: "Prep for design check",
                hours: 3,
                label: "work",
                loc: "home"
            }
        ],
        chosen: []
    }
    this.filterOptions=this.filterOptions.bind(this);
    this.sortOptions=this.sortOptions.bind(this);
    this.buildTask=this.buildTask.bind(this);
    this.hrsFilter=this.hrsFilter.bind(this);
    this.allFilters=this.allFilters.bind(this);
  }

  filterOptions(info) {
    let label_fits = this.state.label == "all" || this.state.label == info.label
    let min_fit = this.state.minHrs == null || this.state.minHrs == "" || this.state.minHrs <= info.hours
    let max_fit = this.state.maxHrs == null || this.state.maxHrs == "" || this.state.maxHrs >= info.hours
    return label_fits && min_fit && max_fit
  }

  sortOptions(infoA, infoB) {
    let diff = infoA.hours - infoB.hours
    let x = this.state.sortBy == sort_opts[0] ? diff : -1 * diff
    return x
  }

  buildTask(info, index, type) {
      let op = type == "options"
      let main = e(
        'div', 
        {style: {borderStyle: op ? "solid" : "hidden", borderColor: colors[info.label], width: op ? "200px" : "400px", marginRight: "10px", marginBottom: "10px"}}, 
        [
            e(
                'img', 
                {src: info.img, alt: info.name, width: op ? "150px" : "50px", style: {display: op ? "block" : "inline", margin: "0 auto", marginTop: "5px", marginBottom: "5px"}}
            ), 
            e(
                op ? 'h2' : 'h3', 
                {style: {textAlign: op ? "center" : "left", margin: 5, display: op ? "block" : "inline"}}, 
                info.name
            ),
            e(
                'p', 
                {style: {textAlign: op ? "center" : "left", marginTop: 5, color: colors[info.label + "_d"], display: op ? "block" : "inline"}}, 
                info.label + "  |  " + info.hours + " hrs" + "  |  " + info.loc
            ),
            e(
                'button',
                { 
                    style: {display: "flex", margin: op ? "0 auto" : "5px", marginBottom: 10, border: "none", padding: "6px"},
                    className: info.label,
                    onClick: () => {

                        if (op) {
                            this.setState({
                                options: this.state.options.filter((val) => { return val.id != info.id }),
                                chosen: this.state.chosen.concat(this.state.options.filter((val) => { return val.id == info.id })[0])
                            })
                        } else {
                            this.setState({
                                chosen: this.state.chosen.filter((val) => { return val.id != info.id }),
                                options: this.state.options.concat(this.state.chosen.filter((val) => { return val.id == info.id })[0])
                            })
                        }
                    } 
                },
                op ? 'Add to My Tasks' : 'Remove from My Tasks'
            )
        ]
      )
      return op ? main : e('div', {className: "bigContainer"}, [e('h1', {className: "container", style: {flexGrow: 0, width: "40px", marginRight: "20px", textAlign: "right"}}, index + 1 + "."), main])
  }

  hrsFilter(type) {
    const x = type == "max"
    return e(
        'div', 
        {style: {marginBottom: "10px"}}, 
        [
            e('p', {style: {display: "inline"}}, x ? 'At most ' : 'At least '), 
            e(
                'input',
                {type: "number", id: x ? "max_hours" : "min_hours", value: x ? this.maxHrs : this.minHrs, onChange: (event) => {
                    if (x) {
                        this.setState({maxHrs: event.target.value})
                    } else {
                        this.setState({minHrs: event.target.value})
                    }
                }, style: {display: "inline"}}
            ), 
            e('p', {style: {display: "inline"}}, ' hours'),
            e(
                'button', 
                {
                    onClick: () => {
                        document.getElementById(x ? "max_hours" : "min_hours").value = ""
                        if (x) {
                            this.setState({maxHrs: null})
                        } else {
                            this.setState({minHrs: null})
                        }
                    }, 
                    style: {marginLeft: "10px"}
                }, 
                'Reset'
            )
        ]
    )
  }

  allFilters() {
    return e(
        'div',
        {},
        [
            this.hrsFilter("min"),
            this.hrsFilter("max"),

            e(
                'div',
                {style: {marginBottom: "10px"}}, 
                [
                    e('p', {style: {display: "inline"}}, 'Category: '), 
                    e(
                        'select',
                        {id: "label", onChange: (event) => {this.setState({label: event.target.value})}},
                        label_opts.map((lab) => e('option', {value: lab}, lab))
                    )
                ]
            ),

            e(
                'div',
                {style: {marginBottom: "10px"}}, 
                [
                    e('p', {style: {display: "inline"}}, 'Sort by: '), 
                    e(
                        'select',
                        {id: "sorting", onChange: (event) => {this.setState({sortBy: event.target.value})}},
                        sort_opts.map((lab) => e('option', {value: lab}, lab))
                    )
                ]
            )
        ]
    )        
  }

  render() {

    console.log(this.state)

    return e(
        'div',
        {},
        [
            e(
                'div',
                {className: "bigContainer"},
                [
                    e(
                        'div',
                        {className: "container", style: {marginRight: "60px"}},
                        [
                            e('h1', {style: {display: "inline", flexGrow: 0}}, 'Task Options'),
                            e('div', {className: "break"}),
                            this.allFilters(),
                            e('div', {className: "break"}),
                            this.state.options.filter(this.filterOptions).sort(this.sortOptions).map((val, i) => this.buildTask(val, i, "options"))
                        ]
                    ),
                    e(
                        'div',
                        {className: "container", style: {minWidth: "250px"}},
                        [
                            e('h1', {style: {display: "inline", flexGrow: 0}}, 'My Tasks'),
                            e('div', {className: "break"}),
                            e(
                                'p', 
                                {style: {flexGrow: 0}},
                                'Total hours for my tasks: ' + this.state.chosen.reduce((acc, curr) => curr.hours + acc, 0)
                            ),
                            e('div', {className: "break"}),
                            this.state.chosen.map((val, i) => this.buildTask(val, i, "chosen"))
                        ]
                    )
                ]
            )
        ]
    )
  }
}

const domContainer = document.querySelector('.options_container');
ReactDOM.render(e(Options), domContainer);