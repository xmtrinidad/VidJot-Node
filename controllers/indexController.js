exports.get_index_page = (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
};

exports.get_about_page = (req, res) => {
  res.render('about');
};