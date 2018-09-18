
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 09/17/2018 21:09:54
-- Generated from EDMX file: C:\Users\usawa\source\repos\TaxiComparison\Taxi\Taxi\Models\TaxiEntitydb.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [TaxiCompare];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[TaxiCompareModelStoreContainer].[Taxi Prices]', 'U') IS NOT NULL
    DROP TABLE [TaxiCompareModelStoreContainer].[Taxi Prices];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Taxi_Prices'
CREATE TABLE [dbo].[Taxi_Prices] (
    [Prices] int  NULL,
    [State] nchar(2)  NULL,
    [Created_On] datetime  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Created_On] in table 'Taxi_Prices'
ALTER TABLE [dbo].[Taxi_Prices]
ADD CONSTRAINT [PK_Taxi_Prices]
    PRIMARY KEY CLUSTERED ([Created_On] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------