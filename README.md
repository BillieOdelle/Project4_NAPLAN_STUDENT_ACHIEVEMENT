# Project4_NAPLAN_STUDENT_ACHIEVEMENT

### Project 4 – NAPLAN Machine Learning Investigation to predict student achievement results.

#### **Team members:** Enessa McArthur,  Billie-Odelle Gore, Minh Phuong Nguyen & Rachel Drayton


## Overview

In order to support schools with adopting the Equity and Excellence policy, the Department of Education wanted to know if there was undue influence on students' results as areas for potential funding and increased resources. There were multiple factors that had been flagged as potentially negatively or positively affecting outcomes. 

This informed some of the questions we started asking in order to interrogate the data. For example, is a student in a very remote community more likely to have lower scores than a student in a metropolitan area? Are students with parents from lower socio-economic backgrounds worse off than students with parents in high level or corporate roles?

## Dataset

Using the data set provided we developed a comprehensive understanding of the interrelationships of the factors. 

As this data didn’t have individual student results, it was important to split it into two groups to reduce duplication:
  - Australia as a whole 
  - Individual States

## Analysis

Using the complete Australian data, we explored trends and found a 6% participation drop in participation over the elected time period.  

We observed National Minimum Score trends across domains and grade levels, highlighting numeracy dominance and declining spelling/writing in older year levels. 

These initial results led to a further unsupervised Machine Learning analysis. Clustering the subgroup data by features/characteristics, we can determine which of these are the most influential contributors to predict student results. 

We created an SQL Database using the data split by states and created an interactive website. 

Purpose of the app design:

  -	Provides an overview of the dataset by displaying key results of the NAPLAN test from 2008 to 2022, as well as some general insights by using Sort and Filter function.

  -	Enables Department leaders to analyze and investigate data sets to provide detailed insights and analysis of the NAPLAN test to the audience by using interactive charts and tables.


## References

Data for this dataset was obtained from The Australian Curriculum, Assessment and Reporting Authority (ACARA) website. 
https://www.acara.edu.au/ 

*"ACARA is an independent statutory authority with a vision to inspire improvement in the learning of all young Australians through world-class curriculum, assessment and reporting."*
