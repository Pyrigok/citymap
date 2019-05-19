const React = require('react');

/**
 * Component for image preview during form filling.
 */
class ImagePreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {

        return (
            <div className="col-sm-7">
                <input className=''
                       type="file"
                       name="image_uploaded_by_user"
                       onChange={this.handleChange}
                       value={this.state.image_uploaded_by_user}
                />
                <img src={this.state.file} alt=""/>
            </div>
        );
    }
}

export default ImagePreview;