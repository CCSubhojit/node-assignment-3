const Elements = require("../model/appModel");
const Url = require("url");

/**
 * Function to filter the collected data and build useful object
 * @param {*} dbElementData
 * @returns Object
 */
const filterData = (dbElementData) => {
  let filteredElems = {};

  if (!dbElementData) {
    // If there are no active data in the database
    // we are showing an empty input

    const commonAttrs = {
      type: "",
      label: "",
      html_id: "",
      width: "",
      height: "",
      placeholder: "",
    };

    filteredElems = {
      filtered: {
        className: "",
        classNameCsv: "",
        otherStylesArray: "",
      },
      inputAttribute: {
        ...commonAttrs,
        class: [],
        style: {},
      },
      rawData: {
        ...commonAttrs,
        other_style: {},
        className: [],
      },
    };
  } else {
    // If data foud in database manipulate the same to make useful

    const cloneData = { ...dbElementData.toObject() };
    // const deepClone = JSON.parse(JSON.stringify(dbElementData));

    const classNameCsv = cloneData.className
      ? cloneData.className.toString()
      : "";
    const className = classNameCsv ? classNameCsv.split(",").join(" ") : "";

    let otherStylesArray = [];
    if (cloneData.other_style) {
      for (const [key, value] of Object.entries(cloneData.other_style)) {
        otherStylesArray.push(`${key}:${value}`);
      }
    }
    otherStylesArray = otherStylesArray.toString();

    const inputAttribute = {
      ...cloneData,
      id: cloneData.html_id,
      class: cloneData.className,
      style: cloneData.other_style,
    };

    delete inputAttribute.__v;
    delete inputAttribute._id;
    delete inputAttribute.html_id;
    delete inputAttribute.created_at;
    delete inputAttribute.is_active;
    delete inputAttribute.className;
    delete inputAttribute.other_style;

    filteredElems = {
      filtered: {
        className,
        classNameCsv,
        otherStylesArray,
      },
      inputAttribute,
      rawData: cloneData,
    };
  }
  return filteredElems;
};

// Show the base form page
exports.showForm = async (req, res, next) => {
  try {
    const elements = await Elements.findOne({ is_active: true });
    const allElements = await Elements.find().sort("-is_active");
    const filterdData = await filterData(elements);

    const baseData = {
      select_type: ["text", "textarea"],
      stored_element: filterdData,
      allElements,
    };

    // On success render the view
    res.render("../views/index", { baseData });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Update the posted data in database
exports.updateFormElement = async (req, res, next) => {
  try {
    const cloneBody = { ...req.body };
    const className = req.body.classname.split(",");
    const otherStyles = req.body.other_styles.split(",");

    // Generating the other_style object
    let otherStylesObj = new Object();
    otherStyles.forEach((value, index) => {
      if (value.includes(":")) {
        const propArray = value.split(":");
        otherStylesObj[propArray[0].trim()] = propArray[1].trim();
      }
    });

    cloneBody.className = className;
    cloneBody.other_style = otherStylesObj;

    // Removing unwanted elements
    delete cloneBody.other_styles;
    delete cloneBody.classname;

    // Updating all active settings to inactive
    // we are not removing to keep a log
    // if log not required we can directly use findOneAndReplace
    const updateAllActive = await Elements.updateMany(
      { is_active: true },
      { is_active: false }
    );

    // creating new entry
    const newElement = await Elements.create(cloneBody);

    // On success redirect to the hompage
    res.redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
