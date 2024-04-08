# Smell Flaky Analyzer

## Scope
Smell Flaky Analyzer is a tool developed as part of a study in the Master's Degree in Computer Science at Universitat Politècnica de València. The resulting document can be accessed through the following [link](https://cutt.ly/nwWQftPn).

## Introduction
Smell Flaky Analyzer is a program developed using React that incorporates other tools and scripts, and is converted into a desktop application using Electron. The tool uses the [JNose](https://github.com/arieslab/jnose) application to detect test smells in Java projects. The result from this detection is merged with the result from a flaky test analysis performed by the [FlakeFlagger](https://github.com/AlshammariA/FlakeFlagger) tool. The final merging is shown in the application with a comparison between test smells and flaky tests for all the test files of a project, to study if there is any correlation between these two problems.

## Clone
You can clone the repository to your local machine with:
    ```
    git clone https://github.com/TheAlexet/smell-flaky-analyzer.git
    ```
