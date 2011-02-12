from setuptools import setup, find_packages

setup(
    name = "hailpixel.ichooseyou",
    version = "0.1",
    packages = find_packages('src'),
    package_dir = {'':'src'},

    # scripts and dependencies
    install_requires = ['setuptools',
                        'zc.buildout',
                        'zc.recipe.egg',
                        'South',
                        "simplejson",
                        "pygeoip",
                        'markdown',
                        ],
    include_package_data = True,
    zip_safe = True,
    
    # author metadata
    author = 'Devin Hunt',
    author_email = 'devinhunt@gmail.com',
    description = '.',
    license = 'Beer',
    url = 'http://ichoose.hailpixel.com',
)

